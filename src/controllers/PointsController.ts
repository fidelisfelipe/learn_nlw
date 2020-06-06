import {Request, Response } from 'express';
import knex from '../databases/connection';

class PointsController {
    async index(request:Request, response:Response){
    }

    async show (request:Request, response:Response){
            const {id} = request.params;

            const point = await knex('points').where('id', id).first();

            if(!point){
                return response.status(400).json({message: 'Point not found.'});
            }

            const items = await knex('items')
                .join('point_items', 'items.id', '=', 'point_items.item_id')
                .where('point_items.point_id', id)
                .select('items.title');

            return response.json({point, items});
    }

    async create (request:Request, response:Response) {
        const {
            name,
            email,
            whatsapp,
            longitude,
            latitude,
            city,
            uf,
            items
        } = request.body;

        const tx = await knex.transaction();

        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            longitude,
            latitude,
            city,
            uf
        };

        const insertedIds = await tx('points').insert(point);
        const point_id = insertedIds[0];
        const pointItems = items.map((item_id:number) => {
            return {
                item_id,
                point_id
            };
        });

        await tx('point_items').insert(pointItems);

        return response.json({
            id: point_id,
            ... point,
        });
    }

}

export default PointsController;