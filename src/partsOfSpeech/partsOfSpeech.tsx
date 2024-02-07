import "../partsOfSpeech/partsOfSpeech.css"
interface PartsOfSpeechProps {
    post: {
        meanings: {
            partOfSpeech: string;
            definitions: {
                definition: string;
                example: string;
                synonyms:string;
            }[];
        }[];
    }[];
}
const partsOfSpeech: React.FC<PartsOfSpeechProps> = ({ post }) => {
    return (
        <div className="partsOfSpeech">
            {post && post.length > 0 && post[0].meanings && post[0].meanings.map((meaning, index) => (
                <div key={index} >
                    <div className="non">
                        <h2 className="speech">{meaning.partOfSpeech}</h2>
                        <div className="line"></div>
                    </div>
                    <div>
                        <p>Meaning</p>
                    </div>
                    <div >

                            {meaning.definitions.map((definition, subIndex) => (
                                <div>
                                     <div className="dot-div">
                                       <p className="dot" style={{ textAlign: "center" }}>.</p>
                                       <p key={subIndex}>{definition.definition}</p>
                                     </div> 
                                    <div className="examples">
                                        <p key={subIndex}>{definition?.example}</p>
                                    </div>
                                   
                                </div>
                            ))}
                                {meaning.definitions.map((definition, synIndex) => (
                                        <div className="synonym">
                                          <p>Synonyms</p>
                                          <p key={synIndex}>{definition?.synonyms}</p>
                                    </div>
                                ))
}
                        

                    </div>

                </div>
            ))}
        </div>
    )
}

export default partsOfSpeech


