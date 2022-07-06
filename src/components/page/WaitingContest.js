import React from 'react'

export const WaitingContest = ({dataState, onClickCounter,tagor_id}) => {
    return (
        <>
            <div className="py-10 text-4xl font-semibold text-center">
                    {dataState.data.title}
            </div>

            <div className="shadow-lg p-6 my-3 flex flex-col justify-center text-center content-center">
                <div className="text-xl">
                    Thông tin đề thi
                </div>
                <div className="font-light">
                    Số câu hỏi: {dataState.data.number}
                </div>
                <div className="font-light">
                    Thời gian: {dataState.data.time} phút
                </div>
                <div className='flex justify-center gap-3'>
                    <button type='button' className='mt-3 shadow-xl border px-4 py-2 text-center font-bold text-lg w-fit' onClick={onClickCounter}>
                        Bắt đầu làm bài
                    </button>
                    <a href={`/contest/${tagor_id}/print`}>
                        <button type='button' className='mt-3 shadow-xl border px-4 py-2 text-center font-bold text-lg w-fit'>
                            Trộn và in đề
                        </button>
                    </a>
                </div>
            </div>
        </>
    )
}