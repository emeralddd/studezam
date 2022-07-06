import Timer from "../items/Timer"

const InProgress = ({ dataState, onSubmit, counter, onChangeDataForm, chooseAnswer }) => {
    const char = ['A', 'B', 'C', 'D']

    return (
        <>
            <div className="">  
                <div>
                    <div className="py-10 text-4xl font-semibold text-center">
                        {dataState.data.title}
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
                                            <a name={q.index}>
                                            </a>
                                            <div className="text-lg font-medium pt-2">
                                                Question {q.index+1}. <span dangerouslySetInnerHTML={{__html:q.question }}  />
                                            </div>
                        
                                            <div className="text-lg font-light">
                                                {
                                                    q.choices.map((t,index) => (
                                                        <div>
                                                            <input type="radio" name={q.index} value={index} id={`${index}-${q.index}`} onChange={onChangeDataForm} className='h-3 bg-orange-400' />
                                                            <label className='ml-2' htmlFor={`${index}-${q.index}`}>
                                                                {char[index]}. <span dangerouslySetInnerHTML={{__html:t }}  />
                                                            </label>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            
                                        </>
                                    ))
                                }
                            </>
                        ))
                    }

                    <button type='button' onClick={onSubmit} className='transition duration-200 shadow-xl border px-4 py-2 text-center font-bold text-lg'>
                        Submit
                    </button>
                </div>
                
                <Timer dataState={dataState} onSubmit={onSubmit} counter={counter} chooseAnswer={chooseAnswer}/>

            </div>
        </>
    )
}

export default InProgress