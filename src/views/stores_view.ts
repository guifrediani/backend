import Store from '../models/Store'
import imagesView from './images_view'
export default {
    render(store : Store) {
       return{
        id: store.id,
        name: store.name,
        Latitude: store.Latitude,
        Longitude: store.Longitude,
        about: store.about,
        instructions: store.instructions,
        opening_hours: store.opening_hours,
        open_on_weekends: store.open_on_weekends,
        images: imagesView.renderMany(store.images)
       } 
    },

    renderMany(stores: Store[]) {
        return stores.map(store => this.render(store))
    }
};