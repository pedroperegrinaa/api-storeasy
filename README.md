# API Storeasy

**CartsController:**

### GET

    GET /carts

<pre><code>[
	{
		"_id": "62914da8b91a7dc1f64e31b0",
		"code": "1234",
		"price": 22,
		"createdAt": "2022-05-27T22:16:08.812Z",
		"updatedAt": "2022-05-27T22:16:08.812Z",
		"__v": 0
	}
]
</code></pre>

Response: return all carts

### POST

    POST /carts

<pre><code>{
	"code": "1234",
	"price": 22,
	"_id": "62914da8b91a7dc1f64e31b0",
	"createdAt": "2022-05-27T22:16:08.812Z",
	"updatedAt": "2022-05-27T22:16:08.812Z",
	"__v": 0
}
</code></pre>

create a cart on database

### UPDATE

    PUT /carts

<pre><code>{
	"code": "1234",
	"price": 22,
	"_id": "62914da8b91a7dc1f64e31b0",
	"createdAt": "2022-05-27T22:16:08.812Z",
	"updatedAt": "2022-05-27T22:16:08.812Z",
	"__v": 0
}
</code></pre>

create a cart on database
