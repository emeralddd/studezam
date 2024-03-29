require('dotenv').config()
const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Questions = require('../models/question/questions')
const users = require('../models/auth/users')
const tasks = require('../models/problems')
const thematics = require('../models/taxonomy/types')
const { MISSING_DATA, ERROR_500, MISSING_PERMISSION, WRONG_DATA, SUCCESS, TAG_EXIST, ERROR505OR404, WRONG_ACCOUNT } = require('../VariableName')
const texts = require('../models/question/texts')
const lessons = require('../models/post/posts')
const contests = require('../models/examination/contests')

const checkValidQuestion = async (qu) => {
    const { question, choices, answer, task, thematic, difficulty } = qu

    if (!question || !choices || !answer || !task || !thematic || !difficulty) {
        return {
            code: 400,
            json: {
                success: false,
                message: MISSING_DATA
            }
        }
    }

    if (answer < 1 || answer > 4 || difficulty % 1000 !== 0) {
        return {
            code: 400,
            json: {
                success: false,
                message: WRONG_DATA
            }
        }
    }

    try {
        const foundTask = await tasks.findOne({ tag: task }).lean()

        if (!foundTask) {
            return {
                code: 400,
                json: {
                    success: false,
                    message: WRONG_DATA
                }
            }
        }

        const foundThematic = await thematics.findOne({ tag: thematic }).lean()

        if (!foundThematic) {
            return {
                code: 400,
                json: {
                    success: false,
                    message: WRONG_DATA
                }
            }
        }
        return {
            code: 200,
            json: {
                success: true
            },
            foundThematic
        }
    } catch (err) {
        return {
            code: 500,
            json: {
                success: false,
                message: ERROR505OR404
            }
        }
    }


}

router.post('/addQuestion', verifyToken, async (req, res) => {
    const { question, choices, answer, explanation, source, task, text, thematic, difficulty } = req.body

    try {
        const questionResult = await checkValidQuestion(req.body)

        if (!questionResult.json.success) {
            return res.status(questionResult.code).json(questionResult.json)
        }

        const { _id } = req.executor

        const foundUser = await users.findById(_id).lean()

        if (!foundUser) {
            return res.status(400).json({
                success: false,
                message: WRONG_ACCOUNT
            })
        }

        if (foundUser.admin < 2) {
            return res.status(403).json({
                success: false,
                message: MISSING_PERMISSION
            })
        }

        const newData = new Questions({
            question,
            choices,
            answer,
            explanation,
            source,
            task,
            thematic,
            difficulty,
            text,
            user: foundUser.username
        })

        await newData.save()

        res.json({
            success: true,
            message: SUCCESS,
            payload: newData
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

router.post('/addText', verifyToken, async (req, res) => {
    const { text, source, task, number } = req.body

    if (!text || !task) {
        return res.status(400).json({
            success: false,
            message: MISSING_DATA
        })
    }

    try {
        const foundTask = await tasks.findOne({ task }).lean()

        if (!foundTask) {
            return res.status(400).json({
                success: false,
                message: WRONG_DATA
            })
        }

        const id = req.executor._id

        const foundUser = await users.findById(id).lean()

        if (!foundUser) {
            return res.status(400).json({
                success: false,
                message: WRONG_ACCOUNT
            })
        }

        if (foundUser.admin < 2) {
            return res.status(403).json({
                success: false,
                message: MISSING_PERMISSION
            })
        }

        const newData = new texts({
            text,
            source,
            task,
            number
        })

        await newData.save()

        res.json({
            success: true,
            message: SUCCESS,
            payload: newData
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

router.post('/addLesson', verifyToken, async (req, res) => {
    const { tag, title, content } = req.body

    if (!tag || !title || !content) {
        return res.status(400).json({
            success: false,
            message: MISSING_DATA
        })
    }

    try {
        const foundLesson = await lessons.findOne({ tag }).lean()

        if (foundLesson) {
            return res.status(400).json({
                success: false,
                message: TAG_EXIST
            })
        }

        const { _id } = req.executor

        const foundUser = await users.findById(_id).select('username').lean()

        if (!foundUser) {
            return res.status(400).json({
                success: false,
                message: WRONG_ACCOUNT
            })
        }

        if (foundUser.admin < 2) {
            return res.status(403).json({
                success: false,
                message: MISSING_PERMISSION
            })
        }

        const newData = new lessons({
            tag,
            title,
            content,
            user: foundUser.username
        })

        await newData.save()

        res.json({
            success: true,
            message: SUCCESS,
            payload: newData
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

router.post('/addContest', verifyToken, async (req, res) => {
    const { task, tag, title, time } = req.body

    if (!task || !tag || !title || !time) {
        return res.status(400).json({
            success: false,
            message: MISSING_DATA
        })
    }

    try {
        const foundContest = await contests.findOne({ tag })

        if (foundContest) {
            return res.status(400).json({
                success: false,
                message: TAG_EXIST
            })
        }

        const { _id } = req.executor

        const foundUser = await users.findById(_id)

        if (!foundUser) {
            return res.status(400).json({
                success: false,
                message: WRONG_ACCOUNT
            })
        }

        if (foundUser.admin < 2) {
            return res.status(403).json({
                success: false,
                message: MISSING_PERMISSION
            })
        }

        const newData = new contests({
            tag,
            title,
            time,
            task
        })

        await newData.save()

        res.json({
            success: true,
            message: SUCCESS,
            payload: newData
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

router.put('/updateQuestion', verifyToken, async (req, res) => {
    const { _id, question, choices, answer, explanation, source, task, thematic, difficulty, text } = req.body

    try {
        const questionResult = await checkValidQuestion(req.body)

        if (!questionResult.json.success) {
            return res.status(questionResult.code).json(questionResult.json)
        }

        const id = req.executor._id

        const foundUser = await users.findById(id)

        if (!foundUser) {
            return res.status(400).json({
                success: false,
                message: WRONG_ACCOUNT
            })
        }

        if (foundUser.admin < 2) {
            return res.status(403).json({
                success: false,
                message: MISSING_PERMISSION
            })
        }

        const newData = await Questions.findByIdAndUpdate(_id
            , {
                question,
                choices,
                answer,
                explanation,
                source,
                task,
                thematic,
                difficulty,
                text,
                user: foundUser.username
            }, {
            new: true
        })

        res.json({
            success: true,
            message: SUCCESS,
            payload: newData
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

router.put('/updateLesson', verifyToken, async (req, res) => {
    const { _id, tag, title, content } = req.body

    if (!_id || !tag || !title || !content) {
        return res.status(400).json({
            success: false,
            message: MISSING_DATA
        })
    }

    try {
        const foundLesson = await lessons.findById(_id).lean()

        if (!foundLesson) {
            return res.status(400).json({
                success: false,
                message: WRONG_DATA
            })
        }

        const id = req.executor._id

        const foundUser = await users.findById(id).select('username').lean()

        if (!foundUser) {
            return res.status(400).json({
                success: false,
                message: WRONG_ACCOUNT
            })
        }

        if (foundUser.admin < 2) {
            return res.status(403).json({
                success: false,
                message: MISSING_PERMISSION
            })
        }

        // console.log(_id)

        const newData = await lessons.findByIdAndUpdate(_id,
            {
                title,
                content,
                tag
            }, {
            new: true
        }).lean()

        // console.log(newData)

        res.json({
            success: true,
            message: SUCCESS,
            payload: newData
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

router.put('/updateContest', verifyToken, async (req, res) => {
    const { _id, task, tag, title, time } = req.body

    if (!_id || !task || !tag || !title || !time) {
        return res.status(400).json({
            success: false,
            message: MISSING_DATA
        })
    }

    try {
        const foundContest = await contests.findById(_id).lean()

        if (!foundContest) {
            return res.status(400).json({
                success: false,
                message: TAG_EXIST
            })
        }

        const id = req.executor._id

        const foundUser = await users.findById(id).select('username').lean()

        if (!foundUser) {
            return res.status(400).json({
                success: false,
                message: WRONG_ACCOUNT
            })
        }

        if (foundUser.admin < 2) {
            return res.status(403).json({
                success: false,
                message: MISSING_PERMISSION
            })
        }

        const newData = await contests.findByIdAndUpdate(_id, {
            tag,
            title,
            time,
            task
        }, {
            new: true
        })

        res.json({
            success: true,
            message: SUCCESS,
            payload: newData
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

router.put('/updateText', verifyToken, async (req, res) => {
    const { _id, text, source, task, number } = req.body

    if (!text || !task) {
        return res.status(400).json({
            success: false,
            message: MISSING_DATA
        })
    }

    try {
        const foundTask = await tasks.findOne({ task }).lean()

        if (!foundTask) {
            return res.status(400).json({
                success: false,
                message: WRONG_DATA
            })
        }

        const id = req.executor._id

        const foundUser = await users.findById(id).lean()

        if (!foundUser) {
            return res.status(400).json({
                success: false,
                message: WRONG_ACCOUNT
            })
        }

        if (foundUser.admin < 2) {
            return res.status(403).json({
                success: false,
                message: MISSING_PERMISSION
            })
        }

        const newData = await texts.findByIdAndUpdate(_id, {
            text,
            source,
            task,
            number
        }, {
            new: true
        })

        res.json({
            success: true,
            message: SUCCESS,
            payload: newData
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

router.delete('/deleteQuestion/:_id', verifyToken, async (req, res) => {
    const _id = req.params._id

    // console.log(req.body)

    try {
        const id = req.executor._id

        const foundUser = await users.findById(id).lean()

        if (!foundUser) {
            return res.status(400).json({
                success: false,
                message: WRONG_ACCOUNT
            })
        }

        if (foundUser.admin < 2) {
            return res.status(403).json({
                success: false,
                message: MISSING_PERMISSION
            })
        }

        await Questions.findByIdAndRemove(_id)

        // console.log(_id)

        res.json({
            success: true,
            message: SUCCESS
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

module.exports = router