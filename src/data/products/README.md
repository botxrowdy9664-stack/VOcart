# Product Data Folder

Is folder se aap website ke products ko manage kar sakte ho.

Files:

- eaturedProducts.js`r
  Featured Products section ka category-wise data.
- `topRatedProducts.js`
  `Top Rated Products` section ka category-wise data.
- `recentlyAddedProducts.js`
  `Recently Added` section ka card data.

Har product object mein aap ye values change kar sakte ho:

- `name`
- `price`
- `img`
- `category`
- `tags`
- `description`
- `color`
- `delivery`

Naya product add karne ke liye same format ka object list ke andar add kar do.
Nayi category add karne ke liye `featuredProducts.js` ya `topRatedProducts.js` mein new key bana do, jaise:

```js
"Smartphones": [
  {
    id: 10,
    name: "Nova X Pro",
    price: 799,
    img: "https://your-image-url.com/image.jpg",
    category: "Smartphones",
    color: "#DBEAFE",
    tags: ["AMOLED", "5G", "256GB"],
    delivery: "Free Delivery until 25/06/2026",
    description: "Your product description here."
  }
]
```

