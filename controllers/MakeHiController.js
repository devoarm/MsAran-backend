const db1 = require("../config/db1");
const db = require("../config/knex/db");

const HiMake = async (req, res) => {
  let queue = await db("hi_visit as v").innerJoin(
    "hi_profiles as hi",
    "v.hi_id",
    "hi.id"
  ).groupBy('v.hi_id')
//   const filter = queue.filter((item) =>{
//     return item.hi_id == '101'
//   })
  res.json(queue);
};

module.exports = { HiMake };

// 101