'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = {

    home: function(req, res){
        return res.status(200).send({
            message: 'Soy la home'
        });
    },

    test: function (req, res){
        return res.status(200).send({
            message: 'Soy la test'
        });
    },

    /*saveProject: function (req, res){
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar el documento.'});

            if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar.'});

            return res.status(200).send({project: projectStored});
        });
    }*/

    saveProject: async function (req, res) {
        try {
          var project = new Project();
      
          var params = req.body;
          project.name = params.name;
          project.description = params.description;
          project.category = params.category;
          project.year = params.year;
          project.langs = params.langs;
          project.image = null;
      
          const projectStored = await project.save();
      
          if (!projectStored) {
            return res.status(404).send({ message: 'No se ha podido guardar.' });
          }
      
          return res.status(200).send({ project: projectStored });
        } catch (error) {
          return res.status(500).send({ message: error });
        }
      },

      getProject: async function(req, res){
        try {
          const projectId = req.params.id;
      
          if (projectId == null) {
            return res.status(404).send({ message: 'No existe' });
          }
      
          const project = await Project.findById(projectId).exec();
      
          if (!project) {
            return res.status(404).send({ message: 'No existe' });
          }
      
          return res.status(200).send({ project });
        } catch (error) {
          return res.status(500).send({ message: 'Error al devolver datos' });
        }
      },

      getProjects: async function(req, res){
        try {
          
          const projects = await Project.find({}).exec();
          
          if(!projects) return res.status(404).send({message: 'No existe'});

          return res.status(200).send(projects);
        } catch (error) {
          return res.status(500).send({ message: error });
        }
      },

      updateProject: async function(req, res) {
        try {
          const projectId = req.params.id;
          const update = req.body;
      
          const updatedProject = await Project.findByIdAndUpdate(projectId, update, { new: true }).exec();
      
          if (!updatedProject) {
            return res.status(404).send({ message: 'Error al actualizar' });
          }
      
          return res.status(200).send({ project: updatedProject });
        } catch (error) {
          return res.status(500).send({ message: error});
        }
      },

      deleteProject: async function(req, res) {
        try {
          const projectId = req.params.id;

          const deleteProject = await Project.findByIdAndDelete(projectId).exec();

          if(!deleteProject) return res.status(404).send({ message: 'Proyecto no encontrado.'});

          return res.status(200).send({deleteProject});
        } catch (error) {
          return res.status(500).send({ message: error});
        }
      },

      uploadImage: async function(req, res){
          const projectId = req.params.id;
          var fileName = 'Imagen no subida...';

          if(req.files){
            try {

              var filePath = req.files.image.path;
              var fileSplit = filePath.split('\\');
              fileName = fileSplit[1];
              var extSplit = fileName.split('\.');
              var fileExt = extSplit[1];

              if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                var update = await Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}).exec();

                if(!update) return res.status(404).send({message: 'Id no encontrado'});
  
                return res.status(200).send({
                  project: update
                })
              }else{
                fs.unlink(filePath, (err) => {
                  return res.status(200).send({message: 'extension no valida.'});
                })
              }

              

            } catch (error) {
              return res.status(500).send({ message: error});
            }
          }else{
            return res.status(500).send({
              message: fileName
            });
          }
      },

      getImageFile: function(req,res){
        var file = req.params.image;
        var path_file = './uploads/'+file;

        fs.exists(path_file, (exists) => {
          if(exists){
          return res.sendFile(path.resolve(path_file));
          }else{
            return res.status(200).send({
            message: "No existe la imagen..."
            });
          }
        });
      }
};

module.exports = controller;