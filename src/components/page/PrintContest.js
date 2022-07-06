import React, { useState } from 'react'
import { Packer, Document, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx'
import { saveAs } from 'file-saver'

const PrintContest = ({dataState}) => {
    const tag = dataState.data.title.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').join('-')

    const [number,setNumber] = useState(1)

    const [fileList,setFileList] = useState([])

    const onChangeNumberForm = event => {
        if(0 <= event.target.value && event.target.value <= 20 )
            setNumber(event.target.value)
    }

    const defaultCell = {
        borders: {
            top: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
            bottom: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
            left: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
            right: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
        },
    }

    const defaultText = {
        spacing: {
            before: 25,
            after: 25,
        },
        alignment: 'center',
    }

    const char=['A','B','C','D']

    const width = [7,8,7,8,7,5,8,8,4,4,8,4,12,8,8,8,8,5,6,4,8,8,12,8,8,7]

    const WIDTH = [12,11,11,12,10,9,12,12,5,6,12,10,14,12,12,9,12,11,9,10,12,12,15,12,12,10]

    const removeSignInText = (s,start) => {
        // console.log(s)
        // console.log(start)
        let si='' 
        for(let i=start; i<start+5; i++) {
            si+='#'
            // console.log(si)
            s=s.replace(`(${si})`,`<b>(${i})</b>`)
        }
        return s
    }

    const convertHtmlToDocxjs = (s,tab) => {
        let tmp='',ita=0,bol=0,und=0,br=0
        const res=[]

        // if(tab) 
        s+='</>'

        for(let i=0; i<s.length; i++) {
            if(s[i]==='<') {
                if(tmp) 
                    res.push(
                        new TextRun({
                            break:br,
                            italics:ita,
                            bold:bol,
                            underline:und?{}:undefined,
                            text: `${tab&&(br===1||res.length===0)?'\t':''}${tmp}`,
                            size: 24,
                        }),
                    )

                tmp=''
                br=0
            
                if(s[i+1]==='/') {
                    if(s[i+2]==='i') ita=0
                    if(s[i+2]==='b') bol=0
                    if(s[i+2]==='u') und=0
                    i+=3
                } else if(s[i+1]==='b'&&s[i+2]==='r') {
                    br=1
                    if(s[i+3]==='/'&&s[i+4]==='>') i+=4
                    if(i+5<s.length&&s[i+4]==='/'&&s[i+5]==='>') i+=5
                } else  {
                    if(s[i+1]==='i') ita=1
                    if(s[i+1]==='b') bol=1
                    if(s[i+1]==='u') und=1
                    i+=2
                }
            } else {
                tmp+=s[i]
            }
        }

        return res
    }

    // console.log(convertHtmlToDocxjs('Hello <b><i>abc</i></b>'))

    const calWidth = (str) => {
        let t=0
        for(let i=0; i<str.length; i++) {
            const tmp = str.charCodeAt(i)
            if(65<=tmp&&tmp<=90) t+=WIDTH[tmp-65]
            else if(97<=tmp&&tmp<=122) t+=width[tmp-97]
            else t+=8
        }
        return t
    }

    const convertChoiceToTable = (index,question,choices) => {
        const maxLength = Math.max(calWidth(choices[0]),calWidth(choices[1]),calWidth(choices[2]),calWidth(choices[3]))

        // console.log(maxLength)
        
        const cells = []

        for(let i=0; i<4; i++) {
            cells.push({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `${char[i]}. `,
                                bold: true,
                                size: 24,
                            }),
                            ...convertHtmlToDocxjs(choices[i])
                        ],
                    })
                ],
                ...defaultCell
            })
        }

        // console.log(cells)

        const res = []

        // console.log(`${index}   ${question[0]===' '}`)

        if(question[0]==='#' || question[0]===' ') {
            if(maxLength<=120) {
                // console.log(index)
                res.push(
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: `Question ${index}: `,
                                                        bold: true,
                                                        size: 24,
                                                    })
                                                ],
                                                
                                            })
                                        ],
                                        width: {
                                            size: 20,
                                            type: WidthType.PERCENTAGE
                                        },
                                        ...defaultCell
                                    }), 
                                    ...cells.map(cell => (
                                        new TableCell({
                                            ...cell,
                                            width: {
                                                size: 20,
                                                type: WidthType.PERCENTAGE
                                            }
                                        }) 
                                    ))
                                ]
                            })
                        ],
                        width: {
                            size:100,
                            type:WidthType.PERCENTAGE
                        }
                    })
                )
            } else {
                // console.log(index)
                res.push(
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: `Question ${index}: `,
                                                        bold: true,
                                                        size: 24,
                                                    })
                                                ],
                                            })
                                        ],
                                        width: {
                                            size: 20,
                                            type: WidthType.PERCENTAGE
                                        },
                                        ...defaultCell
                                    }),
                                    new TableCell({
                                        ...cells[0],
                                        width: {
                                            size: 40,
                                            type: WidthType.PERCENTAGE
                                        }
                                    }),
                                    new TableCell({
                                        ...cells[1],
                                        width: {
                                            size: 40,
                                            type: WidthType.PERCENTAGE
                                        }
                                    }) 
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [],
                                        ...defaultCell,
                                        width: {
                                            size: 20,
                                            type: WidthType.PERCENTAGE
                                        }
                                    }),
                                    new TableCell({
                                        ...cells[2],
                                        width: {
                                            size: 40,
                                            type: WidthType.PERCENTAGE
                                        }
                                    }),
                                    new TableCell({
                                        ...cells[3],
                                        width: {
                                            size: 40,
                                            type: WidthType.PERCENTAGE
                                        }
                                    }) 
                                ]
                            }),
                        ],
                        width: {
                            size:100,
                            type:WidthType.PERCENTAGE
                        }
                    })
                )
            }
        } else {
            res.push(
                new Paragraph({
                    spacing: {
                        before: 50,
                        after: 50,
                    },
                    children: [
                        new TextRun({
                            text: `Question ${index}: `,
                            bold: true,
                            size: 24,
                        }),
                        ...convertHtmlToDocxjs(question)
                    ],
                })
            )
            
            // console.log(maxLength)

            if(maxLength<=144) {
                res.push(
                    new Table({
                        rows: [
                            new TableRow({
                                children: cells.map(cell => (
                                    new TableCell({
                                        ...cell,
                                        width: {
                                            size: 25,
                                            type: WidthType.PERCENTAGE
                                        }
                                    }) 
                                ))
                            })
                        ],
                        width: {
                            size:100,
                            type:WidthType.PERCENTAGE
                        }
                    })
                )
            } else if(maxLength<=288) {
                res.push(
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        ...cells[0],
                                        width: {
                                            size: 50,
                                            type: WidthType.PERCENTAGE
                                        }
                                    }),
                                    new TableCell({
                                        ...cells[1],
                                        width: {
                                            size: 50,
                                            type: WidthType.PERCENTAGE
                                        }
                                    }) 
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        ...cells[2],
                                        width: {
                                            size: 50,
                                            type: WidthType.PERCENTAGE
                                        }
                                    }),
                                    new TableCell({
                                        ...cells[3],
                                        width: {
                                            size: 50,
                                            type: WidthType.PERCENTAGE
                                        }
                                    }) 
                                ]
                            })
                        ],
                        width: {
                            size:100,
                            type:WidthType.PERCENTAGE
                        }
                    })
                )
            } else {
                cells.map(cell => {
                    res.push(cell.children[0])
                })
            }
        }
        
        return res
    }

    const shuffleArray = (array) => {
        for(let i=array.length-1; i>=0; i--) {
            const j=Math.floor(Math.random()*(i+1))
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }

    const mix = id => new Promise((resolve, reject) => {

        const tasksList = dataState.data.task

        if(id!==0) {
            shuffleArray(tasksList)
    
            for(let i=0; i<tasksList.length; i++) {
                // console.log(tasksList[i].tag)
                if(tasksList[i].tag!=='docdientu') {
                    console.log(tasksList[i].tag)
                    shuffleArray(tasksList[i].questions)
                }
            }
        }

        let questions = []

        let acindex=0

        for(const t of tasksList) {
            questions.push(new Paragraph({
                spacing: {
                    before: 50,
                    after: 50,
                },
                children: [
                    new TextRun({
                        text: t.statement,
                        italics: true,
                        bold: true,
                        size: 24,
                    }),
                ],
            }))

            if(t.text.text) {
                questions.push(new Paragraph({
                    spacing: {
                        before: 50,
                        after: 50,
                    },
                    children: convertHtmlToDocxjs(t.tag==='docdientu'?removeSignInText(t.text.text,acindex+1):t.text.text,true)
                }))

                questions.push(new Paragraph({
                    spacing: {
                        before: 25,
                        after: 25,
                    },
                    children: [
                        new TextRun({
                            text: t.text.source,
                            size: 20,
                            italics: true,
                        })
                    ],
                    alignment: 'right'
                }))
            }

            // console.log(questions)

            for(const q of t.questions) {
                // console.log(questions)
                acindex++
                questions = [...questions,...convertChoiceToTable(acindex,q.question,q.choices)]
            }
        }

        const doc = new Document({
            sections: [{
                properties: {
                    page: {
                        margin: {
                            top: 1080,
                            right: 1080,
                            bottom: 1080,
                            left: 1080,
                        },
                    },
                },
                
                children: [
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: "STUDEZAM",
                                                        bold: true,
                                                        size: 24,
                                                    }),
                                                ],
                                                ...defaultText
                                            })
                                        ],
                                        ...defaultCell
                                    }),

                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: "KỲ THI THỬ TỐT NGHIỆP TRUNG HỌC PHỔ THÔNG NĂM 2022",
                                                        bold: true,
                                                        size: 24
                                                    }),
                                                ],
                                                ...defaultText
                                            })
                                        ],
                                        ...defaultCell
                                    }),
                                ],
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: "ĐỀ THI NGẪU NHIÊN",
                                                        size: 24
                                                    }),
                                                ],
                                                ...defaultText
                                            })
                                        ],
                                        ...defaultCell
                                    }),
                                    
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: "Bài thi: NGOẠI NGỮ; Môn thi: TIẾNG ANH",
                                                        bold: true,
                                                        size: 24
                                                    }),
                                                ],
                                                ...defaultText
                                            })
                                        ],
                                        ...defaultCell
                                    }),
                                ],
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: `(Mã đề: ${id})`,
                                                        italics: true,
                                                        size: 20
                                                    }),
                                                ],
                                                ...defaultText
                                            })
                                        ],
                                        ...defaultCell
                                    }),

                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: "Thời gian làm bài: 60 phút, không kể thời gian phát đề",
                                                        italics: true,
                                                        size: 20
                                                    }),
                                                ],
                                                ...defaultText
                                            })
                                        ],
                                        ...defaultCell
                                    }),
                                ],
                            }),
                        ],
                        width: {
                            size:100,
                            type:WidthType.PERCENTAGE
                        }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                break: 2,
                                text: "Họ và tên thí sinh: ..................................................................................................................\n",
                                bold: true,
                                size: 24,
                            }),
                            new TextRun({
                                break: 1,
                                text: "Số báo danh: ...........................................................................................................................",
                                bold: true,
                                size: 24,
                            }),
                            new TextRun({
                                break: 1
                            })
                        ],
                        spacing: {
                            after: 50,
                        },
                    }),
                    ...questions
                ],
            }],
        })

        resolve(doc)
    })

    const print = async event => {
        event.preventDefault()
        const list = []

        for(let i=0; i<number; i++) {
            list.push(mix(i))
        }
        
        const res = await Promise.all(list)

        setFileList(res)
    }

    const down = async(id) => {
        const a = await Packer.toBlob(fileList[id])
        saveAs(a,`${tag}-${id}.docx`)
    }

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
            </div>

            <div className='flex flex-col justify-center text-center content-center p-6 border-2 mt-20'>
                <div className="pb-10 text-4xl font-semibold text-center">
                    In đề
                </div>

                <div className='flex items-center justify-center pb-8'>
                    <div className='w-60 text-xl'>
                        Số lượng đề
                    </div>
                    <input type='number' className="w-60 font-light border-2 p-2 rounded-md text-sm" value={number} min='1' max='20' placeholder="Nhập số đề" onChange={onChangeNumberForm} />
                </div>

                <button type='button' className='mt-3 mx-auto shadow-xl border px-4 py-2 text-center font-bold text-lg w-fit' onClick={print}>
                    In đề
                </button>
            </div>

            {
                fileList.length === 0 ? <></> :
                <div className='flex flex-col justify-center text-center content-center p-6 border-2 mt-20'>
                    <div className="text-xl font-semibold text-center mb-3">
                        Click vào đề để tải xuống
                    </div>

                    {
                        fileList.map((f,i) => (
                            <div className='hover:text-orange-400 hover:cursor-pointer my-1 text-lg' onClick={down.bind(this,i)}>
                                {`${tag}-${i}.docx`}
                            </div>
                        ))
                    }
                </div>
            }
        </>
    )
}

export default PrintContest