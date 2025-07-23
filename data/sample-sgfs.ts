export const sampleSGFs = {
  joseki: `(;FF[4]CA[UTF-8]AP[Example]ST[2]RU[Japanese]SZ[19]KM[6.5]
PB[Student]PW[Teacher]
;B[qd];W[dp];B[pp];W[dc];B[oc];W[qi];B[qg];W[oi];B[mc];W[ce]
;B[jp];W[mq];B[lp];W[mp];B[lo];W[mo];B[ln];W[mn];B[lm];W[mm]
;B[ll];W[ml];B[lk];W[mk];B[lj];W[mj];B[li];W[mi];B[lh];W[mh]
C[This is a basic example of influence vs territory. White has gained central influence while Black has secured territory on the left side.])`,

  lifeAndDeath: `(;FF[4]CA[UTF-8]AP[Example]ST[2]RU[Japanese]SZ[19]KM[6.5]
PB[Student]PW[Teacher]
;B[dd];W[pp];B[dp];W[pd];B[qf];W[qh];B[of];W[nd];B[pi];W[qi]
;B[pj];W[qj];B[pk];W[qk];B[pl];W[ql];B[pm];W[qm];B[pn];W[qn]
;B[po];W[qo];B[qp];W[rp];B[qq];W[rq];B[qr];W[rr];B[pr];W[rs]
C[This sequence shows how Black can live in the corner despite White's strong outside position. The key is understanding the vital points for making two eyes.])`,

  opening: `(;FF[4]CA[UTF-8]AP[Example]ST[2]RU[Japanese]SZ[19]KM[6.5]
PB[Black Player]PW[White Player]DT[2024-01-15]
EV[Opening Principles Demo]
;B[pd]C[Black takes the upper right corner. In the opening, corners are most valuable because they provide natural boundaries that make territory easier to secure.]
;W[dp]C[White responds by taking the lower left corner. This is a common and balanced approach.]
;B[pp]C[Black takes another corner, now controlling two of the four corners. This gives Black a slight advantage in the opening.]
;W[dd]C[White takes the remaining corner. Now all four corners are occupied, which often signals the end of the pure corner-grabbing phase.]
;B[fq]C[Black approaches White's corner. With all corners taken, players typically turn to the sides next, either by approaching opponent corners or extending from their own.]
;W[cn]C[White responds to Black's approach with a pincer, both defending the corner and putting pressure on Black's stone.]
;B[jp]C[Black extends along the bottom side, creating a framework. This move works well with the corner stone.]
;W[qf]C[White approaches Black's corner, following the same principle of fighting for the sides after the corners are settled.]
;B[nd]C[Black responds with a pincer, similar to White's earlier play. This creates a complex fighting position.]
;W[rd]C[White settles in the corner, ensuring a base for the stones.]
;B[qc]C[Black takes the corner territory, completing a common joseki sequence.]
C[This demonstrates the fundamental opening principle: corners first, then sides, then center. Players prioritize the most efficient ways to build territory and influence.])`,
};

export const sampleGameDescriptions = {
  joseki: {
    title: "Basic Joseki Pattern",
    description: "Learn fundamental corner patterns and their applications",
    initialCommentary: "This game demonstrates essential joseki (corner patterns) that every go player should know. These standardized sequences help players develop efficiently in the opening."
  },
  lifeAndDeath: {
    title: "Life and Death Principles", 
    description: "Understanding how to live and kill groups",
    initialCommentary: "This position focuses on life and death - the fundamental skill of determining whether groups can live or will die. Understanding eye shapes is crucial for strong play."
  },
  opening: {
    title: "Opening Strategy",
    description: "Fundamental principles for strong opening play",
    initialCommentary: "This game illustrates the key opening principles in go: secure corners first, then develop along the sides, and finally fight for the center. Each move follows strategic priorities."
  }
};