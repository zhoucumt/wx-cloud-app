// 云函数入口文件
const cloud = require('wx-server-sdk');
const axios = require('axios');
const doubanbook = require("doubanbook");

cloud.init();

async function getDoubanBook(isbn) {
  console.log('in------------------');
  //https://search.douban.com/book/subject_search?search_text=9787552618006
  const url = "https://search.douban.com/book/subject_search?search_text=" + isbn;
  let res = await axios.get(url);
  console.log('res: ', res);

  let reg = /window\.__DATA__ = "(.*)"/;

  if (reg.test(res.data)) {
    let bookdata = RegExp.$1;
    console.log('doubanbook: ', doubanbook(bookdata));
    return doubanbook(bookdata)[0];
  }

  // console.log(res);

  return res;
}

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const {isbn} = event;

  const res = await getDoubanBook(isbn);

  db.collection('books').add({
    data: {
      title: res.title,
      coverurl: res.cover_url
    },
    success: function(res) {
      
    }
  });

  return {
    title: res.title,
    coverurl: res.cover_url
  };
}