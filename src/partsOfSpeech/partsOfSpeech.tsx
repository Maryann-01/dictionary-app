import "../partsOfSpeech/partsOfSpeech.css"
interface PartsOfSpeechProps {
    post: {
        sourceUrls: string[];
        meanings: {
            partOfSpeech: string;
            synonyms: string[];
            antonyms: string[];
            definitions: {
                definition: string;
                example: string;

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
                        <p className="meaning">Meaning</p>
                    </div>
                    <div >

                        {meaning.definitions.map((definition, subIndex) => (
                            <div className="eg-definition">
                                <div className="dot-div">
                                    <p className="dot" style={{ textAlign: "center" }}>.</p>
                                    <p key={subIndex} className="definition-p">{definition.definition}</p>
                                </div>
                                {definition.example && (
                                    <div className="examples">
                                        <p key={subIndex}>{definition.example}</p>
                                    </div>
                                )}

                            </div>
                        ))}
                        {meaning.synonyms?.length > 0 && (
                            <div className="synonyms-container">
                                <p className="synon-words"><span className="synon-anton">Synonyms</span>{meaning.synonyms.join(", ")}</p>
                            </div>
                        )}
                        {meaning.antonyms?.length > 0 && (
                            <div className="synonyms-container anton-container">
                                <p className="anton-words"><span className="synon-anton">Antonyms </span>{meaning.antonyms.join(", ")}</p>
                            </div>
                        )}
                    </div>



                </div>

            ))}
            <hr />
            <div className="source">
                <p>Source</p>
                <p>{post[0]?.sourceUrls[0] || "No source URLs found"}</p>

            </div>
        </div>
    )
}

export default partsOfSpeech


