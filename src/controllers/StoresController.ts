
import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import Store from '../models/Store';
import storesView from '../views/stores_view'
import * as Yup from 'yup'

export default {
    async index(request : Request, response : Response){
        const storeRepository = getRepository(Store);

        const stores = await storeRepository.find({
            relations: ['images']
        });

        return response.json(storesView.renderMany(stores));
    },
    async show(request : Request, response : Response){
        const { id } = request.params;
            console.log(id);
        const storesRepository = getRepository(Store);

        const store = await storesRepository.findOneOrFail(id, {
            relations:['images']
        });

        return response.json(storesView.render(store));
    },

    async create(request : Request, response : Response){

        const {
            name,
            Latitude,
            Longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
    
        const storesRepository = getRepository(Store);

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path : image.filename }
        })
        
        const data = {
            name,
            Latitude,
            Longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        };
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            Latitude: Yup.number().required(),
            Longitude:  Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: 
                Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });

        const finalData = schema.cast(data);

        await schema.validate(data, {
            abortEarly:false, //retorna todos os campos com erro
        })
        const store = storesRepository.create(data);
    
       await storesRepository.save(store);
    
        return response.status(201).json(store);
    }
};