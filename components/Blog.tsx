import { useState } from 'react';
import { SGFViewer } from './SGFViewer';
import { SGFUploader } from './SGFUploader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { SGFParser } from '../lib/sgf-parser';
import { sampleSGFs, sampleGameDescriptions } from '../data/sample-sgfs';

export function Blog() {
  const [selectedSGF, setSelectedSGF] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [activeTab, setActiveTab] = useState('samples');

  // Parse sample SGFs
  const parseSampleSGF = (sgfContent: string, key: keyof typeof sampleGameDescriptions) => {
    try {
      const parsed = SGFParser.parse(sgfContent);
      const description = sampleGameDescriptions[key];
      return {
        title: description.title,
        description: description.description,
        moves: parsed.moves.map(move => ({
          stone: { x: move.x, y: move.y, color: move.color },
          title: `${move.color === 'black' ? 'Black' : 'White'} ${move.moveNumber}`,
          commentary: move.comment || `${move.color === 'black' ? 'Black' : 'White'} plays at ${String.fromCharCode(97 + move.x)}${20 - move.y}.`,
        })),
        boardSize: parsed.size,
        gameInfo: parsed.gameInfo,
        initialCommentary: description.initialCommentary,
      };
    } catch (error) {
      console.error('Error parsing sample SGF:', error);
      return null;
    }
  };

  const loadSampleGame = (key: keyof typeof sampleSGFs) => {
    const gameData = parseSampleSGF(sampleSGFs[key], key);
    if (gameData) {
      setSelectedSGF(gameData);
      setSelectedFile('');
      setActiveTab('viewer');
    }
  };

  const handleSGFSelect = (sgfData: any) => {
    setSelectedSGF(sgfData);
    setSelectedFile(sgfData.title);
    setActiveTab('viewer');
  };

  return (
    <section id="blog" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl">Go Game Records & Analysis</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interactive go game viewer supporting SGF files. Upload your own games 
              or explore our sample lessons covering fundamental concepts.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="samples">Sample Games</TabsTrigger>
              <TabsTrigger value="upload">Upload SGF</TabsTrigger>
              <TabsTrigger value="viewer">Game Viewer</TabsTrigger>
            </TabsList>

            <TabsContent value="samples" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => loadSampleGame('opening')}>
                  <CardHeader>
                    <CardTitle>Opening Principles</CardTitle>
                    <CardDescription>
                      Learn the fundamental priority order: corners, sides, then center
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      View Game
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => loadSampleGame('joseki')}>
                  <CardHeader>
                    <CardTitle>Basic Joseki</CardTitle>
                    <CardDescription>
                      Essential corner patterns every go player should know
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      View Game
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => loadSampleGame('lifeAndDeath')}>
                  <CardHeader>
                    <CardTitle>Life & Death</CardTitle>
                    <CardDescription>
                      Understanding eye shapes and group survival
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      View Game
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Want to view your own games? Upload SGF files in the next tab.
                </p>
                <Button onClick={() => setActiveTab('upload')}>
                  Upload Your Games
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="upload" className="space-y-8">
              <SGFUploader 
                onSGFSelect={handleSGFSelect}
                selectedFile={selectedFile}
              />
            </TabsContent>

            <TabsContent value="viewer" className="space-y-8">
              {selectedSGF ? (
                <div className="space-y-8">
                  <SGFViewer 
                    title={selectedSGF.title}
                    description={selectedSGF.description}
                    moves={selectedSGF.moves}
                    boardSize={selectedSGF.boardSize}
                    initialCommentary={selectedSGF.initialCommentary}
                  />
                  
                  {selectedSGF.gameInfo && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Game Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          {selectedSGF.gameInfo.playerBlack && (
                            <div>
                              <span className="font-medium">Black Player: </span>
                              {selectedSGF.gameInfo.playerBlack}
                              {selectedSGF.gameInfo.blackRank && ` (${selectedSGF.gameInfo.blackRank})`}
                            </div>
                          )}
                          {selectedSGF.gameInfo.playerWhite && (
                            <div>
                              <span className="font-medium">White Player: </span>
                              {selectedSGF.gameInfo.playerWhite}
                              {selectedSGF.gameInfo.whiteRank && ` (${selectedSGF.gameInfo.whiteRank})`}
                            </div>
                          )}
                          {selectedSGF.gameInfo.date && (
                            <div>
                              <span className="font-medium">Date: </span>
                              {selectedSGF.gameInfo.date}
                            </div>
                          )}
                          {selectedSGF.gameInfo.result && (
                            <div>
                              <span className="font-medium">Result: </span>
                              {selectedSGF.gameInfo.result}
                            </div>
                          )}
                          {selectedSGF.gameInfo.komi && (
                            <div>
                              <span className="font-medium">Komi: </span>
                              {selectedSGF.gameInfo.komi}
                            </div>
                          )}
                          {selectedSGF.gameInfo.event && (
                            <div>
                              <span className="font-medium">Event: </span>
                              {selectedSGF.gameInfo.event}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No game selected. Choose a sample game or upload your own SGF file to begin.
                  </p>
                  <div className="space-x-4">
                    <Button onClick={() => setActiveTab('samples')}>
                      View Sample Games
                    </Button>
                    <Button variant="outline" onClick={() => setActiveTab('upload')}>
                      Upload SGF Files
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Additional learning resources */}
          <div className="border-t pt-16">
            <h3 className="text-2xl mb-8 text-center">More Learning Resources</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Online Go Servers</CardTitle>
                  <CardDescription>Practice against players worldwide</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">
                    <strong>KGS (Kiseido Go Server):</strong> One of the most popular servers with excellent teaching features and strong players.
                  </p>
                  <p className="text-sm">
                    <strong>OGS (Online-Go.com):</strong> Modern interface with correspondence and live games, great for beginners.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>SGF File Resources</CardTitle>
                  <CardDescription>Where to find go game records</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">
                    <strong>GoGoD Database:</strong> Comprehensive collection of professional games in SGF format.
                  </p>
                  <p className="text-sm">
                    <strong>Waltheri's Pattern Search:</strong> Search professional games by patterns and positions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}