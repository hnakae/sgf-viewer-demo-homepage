import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Upload, FileText, X } from 'lucide-react';
import { SGFParser } from '../lib/sgf-parser';

interface SGFFile {
  name: string;
  content: string;
  gameInfo: any;
}

interface SGFUploaderProps {
  onSGFSelect: (sgfData: any) => void;
  selectedFile?: string;
}

export function SGFUploader({ onSGFSelect, selectedFile }: SGFUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<SGFFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    const newFiles: SGFFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.name.endsWith('.sgf')) {
        try {
          const content = await file.text();
          const parsed = SGFParser.parse(content);
          newFiles.push({
            name: file.name,
            content,
            gameInfo: parsed.gameInfo,
          });
        } catch (error) {
          console.error(`Error parsing ${file.name}:`, error);
        }
      }
    }
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const selectSGF = (file: SGFFile) => {
    try {
      const parsed = SGFParser.parse(file.content);
      onSGFSelect({
        title: `${file.gameInfo.playerBlack || 'Black'} vs ${file.gameInfo.playerWhite || 'White'}`,
        description: `${file.gameInfo.event ? `${file.gameInfo.event} - ` : ''}${file.gameInfo.date || 'Game record'}`,
        moves: parsed.moves.map(move => ({
          stone: { x: move.x, y: move.y, color: move.color },
          title: `${move.color === 'black' ? 'Black' : 'White'} ${move.moveNumber}`,
          commentary: move.comment || `${move.color === 'black' ? 'Black' : 'White'} plays at ${String.fromCharCode(97 + move.x)}${20 - move.y}.`,
        })),
        boardSize: parsed.size,
        gameInfo: parsed.gameInfo,
        initialCommentary: `Game between ${parsed.gameInfo.playerBlack || 'Black'} and ${parsed.gameInfo.playerWhite || 'White'}. ${parsed.gameInfo.gameComment || ''}`,
      });
    } catch (error) {
      console.error('Error selecting SGF:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload SGF Files
          </CardTitle>
          <CardDescription>
            Upload your go game records in SGF format to view them with the interactive board.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/25 hover:border-muted-foreground/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <div className="space-y-2">
              <p>Drag and drop SGF files here, or click to browse</p>
              <p className="text-sm text-muted-foreground">
                Supports .sgf files containing go game records
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".sgf"
              onChange={handleFileInput}
              className="hidden"
            />
            <Button 
              onClick={() => fileInputRef.current?.click()}
              className="mt-4"
            >
              Browse Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Game Records</CardTitle>
            <CardDescription>
              Click on a game to view it in the interactive board below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedFile === file.name 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:bg-muted/50'
                  }`}
                  onClick={() => selectSGF(file)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {file.gameInfo.playerBlack || 'Black'} vs {file.gameInfo.playerWhite || 'White'}
                        {file.gameInfo.date && ` • ${file.gameInfo.date}`}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}