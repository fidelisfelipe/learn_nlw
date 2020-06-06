import {Request, Response } from 'express';
import knex from '../databases/connection';

class ItemsController{
    async index (request:Request, response:Response){
        const items = await knex('items').select('*');
        console.log('load items db');
    
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/upload/${item.image}`
            };
        });
    
        return response.json(serializedItems);
    }
}

export default ItemsController;