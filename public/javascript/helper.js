let postp = function (url, data) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: url,
      data: data,
      type: 'post',
      success: function (res) {
        if (res.error) {
          reject(res.msg);
        }
        else {
          resolve(res);
        }
      },
      error: function (err) {
        reject(err);
      }
    });
  });
};