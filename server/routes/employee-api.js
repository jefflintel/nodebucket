/* ============================================
 ; Title:  employee-api.js
 ; Author: Professor Krasso
 ; Modified by: Jeff Lintel
 ; Date:   28 September 2020
 ; Description: houses all api logic for employees
 ===========================================*/


const express = require('express');
//const employee = require('../models/employee');
const Employee = require('../models/employee');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response')

const router = express.Router();

router.get('/:empId', async(req, res) => {
  try {
    //use mongoose employee model to query mongodb atlas by empId
    Employee.findOne({ 'empId': req.params.empId }, function(err, employee) {
      //if there's a database level error, return a server 500 error
      if(err) {
        console.log(err);
        res.status(404).send({
          'message': 'Internal server error!'
        })
        //no errors, return employee object
      } else {
        console.log(employee);
        res.json(employee);
      }
    })
    //catch anything unanticipated
  } catch (e) {
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error!'
    })
  }
 })

 //find all tasks for an employee
router.get('/:empId/tasks', async(req, res) => {
  try{
    Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, employee) {
      if(err) {
        console.log(err);

        const mongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(mongoDbErrorResponse.toObject());
      } else {
        console.log(employee);
        //res.json(employee);
        const employeeTaskResponse = new BaseResponse('200', 'Query successful', employee);
        res.json(employeeTaskResponse.toObject());
      }
    })
  } catch(e) {
    res.status(500).send({
      'message': 'Internal server error!'
    })
  }
})

//create a new task

router.post('/:empId/tasks', async(req, res) => {
  try {

    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if(err) {
        console.log(err);
        const createTaskMongoDbError = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(createTaskMongoDbError.toObject());
      } else {
        const item = {
          text: req.body.text
        }

        employee.todo.push(item);
    employee.save(function(err, updatedEmployee) {
      if(err) {
        console.log(err);
        const createTaskOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(createTaskOnSaveMongoDbErrorResponse.toObject());
      } else {
        console.log(updatedEmployee);
        const createTaskOnSaveSuccessResponse = new BaseResponse('200', 'Entry successful', updatedEmployee);
        res.json(createTaskOnSaveSuccessResponse.toObject());
      }
    })
      }
    });



  } catch (e) {
    console.log(e);

    const createTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(createTaskCatchErrorResponse.toObject());
  }
})

//update a task
router.put('/:empId/tasks', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, function(err, employee){
      if(err) {
        console.log(err);
        const updateTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(updateTaskMongoDbErrorResponse.toObject());
      } else {
        console.log(employee);
        employee.set({
          todo: req.body.todo,
          done: req.body.done
        });

        employee.save(function(err, updatedEmployee){
          if(err) {
            console.log(err);
            const updateTaskOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
            res.status(500).send(updateTaskOnSaveMongoDbErrorResponse.toObject());
          } else {
            console.log(updatedEmployee);
            const updatedTaskOnSaveSuccessResponse = new BaseResponse('200', 'Update successful', updatedEmployee);
            res.json(updatedTaskOnSaveSuccessResponse.toObject());
          }
        })
      }
    })
  } catch(e) {
    console.log(e);
    const updateTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error', err)
    res.status(500).send(updateTaskCatchErrorResponse.toObject());

  }
})
//delete a task
router.delete('/:empId/tasks/:taskId', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if(err) {
        console.log(err)
        const deleteTaskMongooseDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(deleteTaskMongooseDbErrorResponse.toObject());
      } else {
        console.log(employee);
        const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
        const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

        if(todoItem){
          employee.todo.id(todoItem._id).remove();
          employee.save(function(err, updatedTodoItemEmployee) {
            if(err) {
              console.log(err)
              const deleteToDoItemOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
              res.status(500).send(deleteToDoItemOnSaveMongoDbErrorResponse.toObject());
            } else {
              console.log(updatedTodoItemEmployee);
              const deleteTodoItemSuccessResponse = new BaseResponse('200', 'Removed item from the todo list', updatedTodoItemEmployee);
              res.json(deleteTodoItemSuccessResponse.toObject());
            }
          })
        } else if(doneItem) {
          employee.done.id(doneItem._id).remove();
          employee.save(function(err, updatedDoneItemEmployee) {
            if(err) {
              console.log(err);
              const deleteDoneItemOnsaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', error);
              res.status(500).send(deleteDoneItemOnsaveMongoDbErrorResponse.toObject());

            }
          })
        } else {
          console.log('Invalid task Id');
          const deleteTaskNotFoundResponse = new ErrorResponse('200', 'Unable to locate the requested task', null);
          res.status(200).send(deleteTaskNotFoundResponse.toObject());
        }
      }
    })
  } catch(e) {
    console.log(e);
    const deleteTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(deleteTaskCatchErrorResponse.toObject());
  }
})

module.exports = router;

