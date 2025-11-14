require('dotenv').config();
const express = require('express');
const app = express();
const { UserModel, TodoModel } = require('./db');
const jwt = require('jsonwebtoken');
const { auth, JWT_SECRET } = require('./auth');
const bcrypt = require('bcrypt');
const { validTodo,validUpdate } = require('./type');
const cors = require('cors')

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.post('/signup', async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email;
        const name = req.body.name;

        const hashPass = await bcrypt.hash(password, 5);

        await UserModel.create({
            email: email,
            password: hashPass,
            name: name
        })
        res.json({
            message: "User signed up successfully"
        })
    } catch (e) {
        res.status(500).json({
            message: "Error while signing up"
        })
    }

})

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const response = await UserModel.findOne({
        email: email
    });

    if (!response) {
        res.json({
            message: "User not found"
        })
        return
    }

    const comparePass = bcrypt.compare(password, response.password);

    if (comparePass) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET)
        console.log(response);
        res.json({
            token,
        })
    }
    else {
        res.status(403).send({
            message: "Invalid credential"
        })
    }
})

app.post('/todo' ,async (req, res) => {
    const reqBody = req.body;
    const parsePayload = validTodo.safeParse(reqBody);
    if (!parsePayload.success) {
        res.status(411).json({
            message: "You sent wrong input"
        })
        return
    }
    // put it in mongo

    await TodoModel.create({
        title: reqBody.title,
        description: reqBody.description,
        completed: false
    })

    res.json({
        message: "Todo Created"
    })

})

app.get('/todos', async (req, res) => {
    const todo = await TodoModel.find({})

    res.json({
        todo
    })
})

app.put('/completed',async (req, res) => {
    const parsePayload = validUpdate.safeParse(req.body);

    if (!parsePayload.success) {
        res.status(411).json({
            message: "You sent wrong input"
        })
        return
    }
    try {
        const update =await TodoModel.updateOne({
            _id: req.body.id
        }, {$set:{
            completed: true
        }})

        if (update.modifiedCount === 0) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.json({
            message: "Todo is Completed Now"
        })
    } catch (e) {
        return res.status(500).json({
            message: "Database error",
            error: e.message
        });
    }
})



app.listen(3000, () => {
    console.log('Server is running on port 3000');
})