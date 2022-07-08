const Timer = ({ counter, chooseAnswer, dataState, onSubmit }) => {
    // console.log(dataState.data.number)
    return (
        <>
            <div className="transition-[width_3s] w-24 hover:w-80 border-orange-400 border-y-2 border-l-2 fixed top-10 right-0 bottom-10 bg-white p-4 overflow-y-auto group text-center hover:block flex flex-col justify-center overflow-x-hidden">
                <div className="group-hover:text-4xl text-sm text-center mb-3">
                    {counter===0?'Hết thời gian':`${Math.floor(counter/60)<10?'0':''}${Math.floor(counter/60)}:${counter%60<10?'0':''}${counter%60}`}
                </div>
                <button type='button' onClick={onSubmit} className='shadow-xl p-1 text-center font-bold text-sm group-hover:text-base mx-auto mb-4'>
                    Submit
                </button>
                <div className="group-hover:flex flex-wrap gap-2 justify-center hidden">
                    {
                        //Array(dataState.data.number-1)
                        [...Array(dataState.data.number)].map((e, i) => 
                            <a href={`#${i}`} className={`flex text-center w-10 p-2 ${chooseAnswer[i]===0?`bg-orange-400`:`bg-orange-600`} content-center rounded-lg`}>
                                <div className="text-white font-bold align-middle text-lg">
                                    {i+1<10?'0':''}{i+1}
                                    {/* {chooseAnswer[i]} */}
                                </div>
                                
                            </a>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Timer