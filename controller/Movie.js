const movieModel = require ('../model/Movie')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')

exports.insertMovie = (data) =>
    new Promise((resolve, reject) => {
        movieModel.create(data)
        .then(() => resolve(requestResponse.berhasil('Berhasil Input Movie')))
        .catch(() => reject(requestResponse.kesalahan))
})
exports.getAllMovie = () =>
    new Promise((resolve, reject) => {
        movieModel.find({})
            .then(movie => resolve(requestResponse.suksesWithData(movie)))
            .catch(error => resolve(requestResponse.kesalahan))
})

exports.getbyId = (id) =>
    new Promise((resolve, reject) => {
        movieModel.findOne({
            _id: objectId(id)
        }).then(movie => resolve(requestResponse.suksesWithData(movie)))
        .catch(error => reject(requestResponse.kesalahan))
    })

exports.edit = (data, id, changeImage) =>
    new Promise((resolve, reject) => {
        movieModel.updateOne({
            _id: objectId(id)
        }, data)
            .then(() => {
                if (changeImage) {
                    deleteImage(data.oldImage)
                }
                resolve(requestResponse.berhasil('Berhasil Edit Movie'))
            }).catch(() => reject(requestResponse.kesalahan))
    })

exports.delete = (id) =>
    new Promise((resolve, reject) => {
        movieModel.findOne({
            _id: objectId(id)
        }).then(movie => {
            movieModel.deleteOne({
            _id: objectId(id)
            }).then(() => {
            deleteImage(movie.image)
            resolve(requestResponse.berhasil('Berhasil Hapus List movie'))
            }).catch(() => reject(requestResponse.kesalahan))
        })
    })