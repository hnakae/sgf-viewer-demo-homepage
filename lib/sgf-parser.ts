interface SGFNode {
  [key: string]: string[];
}

interface SGFGame {
  nodes: SGFNode[];
}

interface ParsedSGF {
  size: number;
  moves: Array<{
    x: number;
    y: number;
    color: 'black' | 'white';
    moveNumber: number;
    comment?: string;
  }>;
  gameInfo: {
    playerBlack?: string;
    playerWhite?: string;
    blackRank?: string;
    whiteRank?: string;
    komi?: string;
    handicap?: string;
    result?: string;
    date?: string;
    event?: string;
    round?: string;
    place?: string;
    timeLimit?: string;
    gameComment?: string;
  };
  comments: { [moveNumber: number]: string };
}

export class SGFParser {
  private static coordinateToPosition(coord: string, size: number): { x: number; y: number } {
    if (coord.length !== 2) {
      throw new Error(`Invalid coordinate: ${coord}`);
    }
    
    const x = coord.charCodeAt(0) - 97; // 'a' = 97
    const y = coord.charCodeAt(1) - 97;
    
    return { x, y };
  }

  private static parsePropertyValue(value: string): string {
    // Remove brackets and handle escaped characters
    return value.replace(/^\[|\]$/g, '').replace(/\\(.)/g, '$1');
  }

  private static tokenize(sgf: string): string[] {
    const tokens: string[] = [];
    let i = 0;
    
    while (i < sgf.length) {
      const char = sgf[i];
      
      if (char === '(' || char === ')' || char === ';') {
        tokens.push(char);
        i++;
      } else if (char === '[') {
        // Property value - find matching closing bracket
        let value = '[';
        i++;
        let depth = 1;
        
        while (i < sgf.length && depth > 0) {
          if (sgf[i] === '[' && sgf[i - 1] !== '\\') {
            depth++;
          } else if (sgf[i] === ']' && sgf[i - 1] !== '\\') {
            depth--;
          }
          value += sgf[i];
          i++;
        }
        tokens.push(value);
      } else if (char.match(/[A-Z]/)) {
        // Property identifier
        let prop = '';
        while (i < sgf.length && sgf[i].match(/[A-Z]/)) {
          prop += sgf[i];
          i++;
        }
        tokens.push(prop);
      } else {
        // Skip whitespace and other characters
        i++;
      }
    }
    
    return tokens;
  }

  private static parseNodes(tokens: string[]): SGFNode[] {
    const nodes: SGFNode[] = [];
    let i = 0;
    
    while (i < tokens.length) {
      if (tokens[i] === ';') {
        // Start of a new node
        const node: SGFNode = {};
        i++; // Skip ';'
        
        while (i < tokens.length && tokens[i] !== ';' && tokens[i] !== ')') {
          if (tokens[i].match(/^[A-Z]+$/)) {
            const property = tokens[i];
            i++;
            
            const values: string[] = [];
            while (i < tokens.length && tokens[i].startsWith('[')) {
              values.push(this.parsePropertyValue(tokens[i]));
              i++;
            }
            
            if (values.length > 0) {
              node[property] = values;
            }
          } else {
            i++;
          }
        }
        
        nodes.push(node);
      } else {
        i++;
      }
    }
    
    return nodes;
  }

  static parse(sgfContent: string): ParsedSGF {
    // Clean up the SGF content
    const cleanSGF = sgfContent.trim();
    
    // Tokenize
    const tokens = this.tokenize(cleanSGF);
    
    // Parse nodes
    const nodes = this.parseNodes(tokens);
    
    if (nodes.length === 0) {
      throw new Error('No nodes found in SGF');
    }
    
    // Extract game info from the first node
    const rootNode = nodes[0];
    const size = rootNode.SZ ? parseInt(rootNode.SZ[0]) : 19;
    
    const gameInfo = {
      playerBlack: rootNode.PB?.[0],
      playerWhite: rootNode.PW?.[0],
      blackRank: rootNode.BR?.[0],
      whiteRank: rootNode.WR?.[0],
      komi: rootNode.KM?.[0],
      handicap: rootNode.HA?.[0],
      result: rootNode.RE?.[0],
      date: rootNode.DT?.[0],
      event: rootNode.EV?.[0],
      round: rootNode.RO?.[0],
      place: rootNode.PC?.[0],
      timeLimit: rootNode.TM?.[0],
      gameComment: rootNode.GC?.[0],
    };
    
    // Extract moves and comments
    const moves: ParsedSGF['moves'] = [];
    const comments: { [moveNumber: number]: string } = {};
    let moveNumber = 0;
    
    for (let i = 1; i < nodes.length; i++) {
      const node = nodes[i];
      
      // Check for black move
      if (node.B) {
        const coord = node.B[0];
        if (coord && coord.length === 2) {
          const pos = this.coordinateToPosition(coord, size);
          moves.push({
            x: pos.x,
            y: pos.y,
            color: 'black',
            moveNumber: ++moveNumber,
            comment: node.C?.[0],
          });
        }
      }
      
      // Check for white move
      if (node.W) {
        const coord = node.W[0];
        if (coord && coord.length === 2) {
          const pos = this.coordinateToPosition(coord, size);
          moves.push({
            x: pos.x,
            y: pos.y,
            color: 'white',
            moveNumber: ++moveNumber,
            comment: node.C?.[0],
          });
        }
      }
      
      // Store comments
      if (node.C) {
        comments[moveNumber] = node.C[0];
      }
    }
    
    return {
      size,
      moves,
      gameInfo,
      comments,
    };
  }
}