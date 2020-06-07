import {Request, Response } from 'express';
import knex from '../databases/connection';

class PointsController {
    async index(request:Request, response:Response){
        
        const {
            city,
            uf,
            items} = request.query;
            
            console.log('point list', city, uf, items);
            const parseItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

            const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parseItems)
            .where('city', String(city))
            .where('uf', String(uf)).distinct()
            .select('points.*');

        response.json(points);
    }

    async show (request:Request, response:Response){
            const {id} = request.params;

            const point = await knex('points').where('id', id).first();

            if(!point){
                return response.status(400).json({message: 'Point not found.'});
            }

            const items = await knex('items')
                .join('point_items', 'items.id', '=', 'point_items.item_id')
                .where('point_items.item_id', id)
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
            image: 'https://images.unsplash.com/photo-1590477330477-9d4d4fe65316?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjczMTc0fQ&auto=format&fit=crop&w=80&q=80',
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
        await tx.commit();
        return response.json({
            id: point_id,
            ... point,
        });
    }

}

export default PointsController;