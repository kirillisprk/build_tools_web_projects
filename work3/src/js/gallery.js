'use strict'
import {Items} from './dataMedia.js';
import RenderItem from "./renderItems.js";

let gallery = document.querySelector(".gallery");
let render = new RenderItem();

const generateHTMLGallery = (items) => {
    for (let item of items) {
        switch (item.type) {
            case 'img':
                gallery.insertAdjacentHTML("beforeend", render.itemImg(item));
                break;
            case 'audio':
                gallery.insertAdjacentHTML("beforeend", render.itemAudio(item));
                break;
            case 'video':
                gallery.insertAdjacentHTML("beforeend", render.itemVideo(item));
        }
    }
}

generateHTMLGallery(Items);