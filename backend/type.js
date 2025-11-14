const zod =require('zod');

const validTodo=zod.object({
    title:zod.string(),
    description:zod.string(),
})

const validUpdate=zod.object({
    id: zod.string()
})

module.exports={
    validTodo: validTodo,
    validUpdate: validUpdate
}