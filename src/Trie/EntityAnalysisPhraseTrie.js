// Derived from a trie
// Tests and bench marking is in the main GoBoost app
// ASCII Characters
const NUM_CHARACTERS = 128;

const SPACE_CHARACTER_VALUE = 32;



class EntityAnalysisPhraseTrieNode {
  constructor( character ){
    this.entity = null;
    this.character = character;
    this.isEndOfPhrase = false;
    this.children = Array( NUM_CHARACTERS );
    this.isSpace = (
      typeof character !== 'string' ? false : character.charCodeAt( 0 ) === SPACE_CHARACTER_VALUE
    );


    // Used the following paradigm for browser compatibility
    for(let i = 0; i < NUM_CHARACTERS; i++){
      this.children[ i ] = null;
    }
  }
}



export default class EntityAnalysisPhraseTrie {
  constructor(){
    this.root = new EntityAnalysisPhraseTrieNode();
  }


  insert = entity => {
    let nodeToSearch = this.root;

    const phraseSplit = entity.name.split('');

    for(let i = 0; i < phraseSplit.length; i++){
      const character = phraseSplit[ i ];


      const characterIndex = character.charCodeAt(0);
      if( characterIndex >= NUM_CHARACTERS ){
        return;
      }


      if( !nodeToSearch.children[ characterIndex ] ){
        const newNodeToSearch = new EntityAnalysisPhraseTrieNode( character );

        nodeToSearch.children[ characterIndex ] = newNodeToSearch;
      }


      nodeToSearch = nodeToSearch.children[ characterIndex ];
    }


    nodeToSearch.isEndOfPhrase = true;
    nodeToSearch.entity = entity;
  }



  search = phrase => {
    let nodeToSearch = this.root;

    const phraseSplit = phrase.split('');

    for(let i = 0; i < phraseSplit.length; i++){
      const character = phraseSplit[ i ];


      const characterIndex = character.charCodeAt(0);
      if( characterIndex >= NUM_CHARACTERS ){
        return;
      }


      if( !nodeToSearch.children[ characterIndex ] ){
        return;
      }


      nodeToSearch = nodeToSearch.children[ characterIndex ];
    }


    return nodeToSearch.entity;
  }



  isPartialEntity = phrase => {
    let nodeToSearch = this.root;

    const phraseSplit = phrase.split('');

    for(let i = 0; i < phraseSplit.length; i++){
      const character = phraseSplit[ i ];


      const characterIndex = character.charCodeAt(0);
      if( characterIndex >= NUM_CHARACTERS ){
        return false;
      }


      if( !nodeToSearch.children[ characterIndex ] ){
        return false;
      }


      nodeToSearch = nodeToSearch.children[ characterIndex ];
    }


    return true;
  }
}