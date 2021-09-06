'use strict';
export default class Render {
    itemImg = (item) => {
        return `<div class="item">
                <img src="${item.media}" alt="${item.media}">
                <p class="product-item__name">${item.title}</p>
            </div>`
    }
    itemAudio = (item) => {
        return `<div class="item">
                <audio controls>
                    <source src="${item.media}" type="audio/mpeg">
                 </audio>
                    <p class="product-item__name">${item.title}</p>
            </div>`
    }
    itemVideo = (item) => {
        return `<div class="item">
             <video controls>
                <source src="${item.media}" type="video/mp4">
             </video>
                <p class="product-item__name">${item.title}</p>
            </div>
    `
    }
}
