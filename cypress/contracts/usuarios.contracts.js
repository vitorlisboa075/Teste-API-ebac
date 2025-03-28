const Joi = require('joi');

// Definindo o esquema Joi para usuários
const usuarioSchema = Joi.object({
    usuarios: Joi.array().items({
    nome: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
    administrador: Joi.boolean(),
    _id: Joi.string()
}),
quantidade: Joi.number()

})
export default usuarioSchema;
