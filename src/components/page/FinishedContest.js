import React from 'react'
import CROSS from '../../assets/x-lg.svg'
import TICK from '../../assets/check2.svg'

const FinishedContest = ({dataState, chooseAnswer }) => {
    const char = ['A', 'B', 'C', 'D']

    return (
        <>  
            <div className="py-10 text-3xl font-semibold text-center">
                {dataState.data.contestData.title}
            </div>

            <div className="shadow-lg p-6 my-3 flex flex-col justify-center text-center">
                <div className="text-5xl font-medium">
                    Your score is
                </div>
                <div className="text-5xl font-semibold my-3">
                    {(dataState.data.correctAnswer*10.0/dataState.data.number).toFixed(1)}
                </div>
                <div className="text-xl">
                    {dataState.data.correctAnswer}/{dataState.data.number}
                </div>
            </div>

            {
                dataState.data.contestData.task.map(t => (
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
                                    
                                    <div className="text-lg font-light">
                                        {
                                            q.choices.map((t,index) => (
                                                chooseAnswer[q.index] === index+1 ? (
                                                    <div className="font-bold flex">
                                                        {
                                                            (chooseAnswer[q.index] === q.answer) ? (
                                                                <>
                                                                    <div className="text-green-500">
                                                                        {char[index]}. <span dangerouslySetInnerHTML={{__html:t }}  /> 
                                                                    </div>
                                                                    <img src={TICK} className='ml-1 w-4 h-auto' />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className="text-red-500">
                                                                        {char[index]}. <span dangerouslySetInnerHTML={{__html:t }}  />
                                                                    </div>
                                                                    <img src={CROSS} className='ml-1 w-4 h-auto' />
                                                                </>
                                                                
                                                            )
                                                        }
                                                    </div>
                                                ) : (
                                                    <div>
                                                        {char[index]}. <span dangerouslySetInnerHTML={{__html:t }}  />
                                                    </div>
                                                )
                                            ))
                                        }
                                    </div>
                                    
                                    <div className="shadow-sm my-2">
                                        <div className="p-2">
                                            {
                                                chooseAnswer[q.index-1] === q.answer ? (
                                                    <>
                                                        <div>
                                                            Explanation: {q.explanation}
                                                        </div>
                                                    </>
                                                        
                                                ) : (
                                                    <>
                                                        <div className="font-bold">
                                                            Correct Answer: {char[q.answer-1]}
                                                        </div>
                                                        <div>
                                                            Explanation: {q.explanation}
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>

                                    </div>
                                    
                                </>
                            ))
                        }
                    </>
                ))
            }
            <button type='button' className='transition duration-200 bg-white right-10 fixed bottom-10 shadow-xl border px-4 py-2 text-center font-bold text-lg'>
                <a href="#top" className="text-black">
                    Xem điểm
                </a>
            </button>

        </>
    )
}

export default FinishedContest