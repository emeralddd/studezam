const Explanation = ({dataState }) => {
    const char = ['A', 'B', 'C', 'D']

    return (
        <>
            <div className="py-10 text-4xl font-semibold text-center">
                Answer of {dataState.data.title}
            </div>

            {
                dataState.data.task.map(t => (
                    <>
                        <div className="pt-10 text-xl font-semibold">
                            {t.statement}
                        </div>

                        <div className="text-lg font-light mb-2">
                            <div dangerouslySetInnerHTML={{__html:t.text.text }}  />
                        </div>

                        <div className="text-sm font-light mb-2 text-right">
                            <div dangerouslySetInnerHTML={{__html:t.text.source }}  />
                        </div>

                        {
                            t.questions.map(q => (
                                <>
                                    <div className="text-lg font-medium pt-2">
                                        Question {q.index+1}. <span dangerouslySetInnerHTML={{__html:q.question }}  />
                                    </div>
                                    {
                                        <div className="text-lg font-light">
                                            {
                                                q.choices.map((t,index) => (
                                                    <div>
                                                        {char[index]}. <span dangerouslySetInnerHTML={{__html:t }}  />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    }
                                    <div className="text-lg">
                                        Answer: {char[q.answer-1]}
                                    </div>
                                    <div className="text-lg">
                                        Explanation: {q.explanation}
                                    </div>
                                </>
                            ))
                        }
                    </>
                ))
            }
        </>
    )
}

export default Explanation