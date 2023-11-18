import express from "express"
import {Event} from "../models/eventModel.js";

const router = express.Router();

// Post events
router.post('/event', async (request, response) => {
    try {
        if (!request.body.date || !request.body.location || !request.body.itemTypes){
            return response.status(400).send({
                message: `Send all required fields: date, location, itemTypes`// function to find all types required?
            });
        }

        // Create object literal
        const newEvent = {
            date: request.body.date,
            location: request.body.location,
            itemTypes: request.body.itemTypes
        };
        const event = await Event.create(newEvent); // Use object literal to create new event using model
        return response.status(201).send(event);
    }catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Get all events
router.get('/event', async (request, response) => {
    try{
        const events = await Event.find({});
        return response.status(200).json({
            count : events.length,
            data : events
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Get event by id
router.get('/event/:id', async (request, response) => {
    try{
        const id = request.params.id; // Gets id field from "/event/:id"
        const event = await Event.findById(id); // Finding event using id
        return response.status(200).json(event);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Update event
router.put('/event/:id', async (request, response) => {
    try{
        if (!request.body.date || !request.body.location || !request.body.itemTypes){
            return response.status(400).send({
                message: `Send all required fields: date, location, itemTypes`// function to find all types required?
            });
        }
        const id = request.params.id;
        const result = await Event.findByIdAndUpdate(id, request.body);

        if (!result){
            return response.status(404).json({message : 'EEvent not found'});
        }
        return response.status(200).json({message : 'Event updated successfully'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Delete event
router.delete('/event/:id', async (request, response) => {
    try{
        const id = request.params.id;
        const result = await Event.findOneAndDelete(id);

        if (!result){
            return response.status(404).json({message : 'Event not found'});
        }
        return response.status(200).json({message : 'Event deleted successfully'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;