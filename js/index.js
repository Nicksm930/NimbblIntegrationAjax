const access_key = "access_key_1MwvMgER8N2E40ry";
const access_secret = "access_secret_MwvMYeGByL5r4vry";
// "access_key": "access_key_1MwvMgER8N2E40ry",
//     "access_secret": "access_secret_MwvMYeGByL5r4vry"
const pageUrl = "https://api.nimbbl.tech";
const getAuthTokenUrl = "/api/v2/generate-token";
const GetOrderIdUrl = "/api/v2/create-order";
const fetchOrderDetailsUrl = "/api/v2/payment-modes";
const initiatePaymentUrl = "/api/v2/initiate-payment";

const dataObj = {
  amount_before_tax: 2.0,
  tax: 0,
  total_amount: 3.0,

  user: {
    email: "nikhilsm930@gmail.com",
    first_name: "nikhil",
    last_name: null,
    country_code: "+91",
    mobile_number: "9999999999",
  },

  shipping_address: {
    address_1: "Manjrekar Lane",
    street: "L.N. Pappan Marg",
    landmark: "Dr E Moses Rd",
    area: "Worli",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400018",
    address_type: "residential",
  },
  currency: "INR",
  invoice_id: "invoice_40",
  referrer_platform: "",
  referrer_platform_identifer: "",
  order_line_items: [
    {
      sku_id: "sku1",
      title: "Burger",
      description: "maharaja MaC",
      quantity: "1",
      rate: 1,
      amount_before_tax: "1",
      tax: "1",
      total_amount: "1",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Ay5KWSTviUsTHZ7m_-YJvOlPMwGhZIPuzobqynBqQbQP1_KWCuc8qlwREOiTP38Hs_fLTJYl&usqp=CAc",
    },
  ],
  custom_attributes: {
    Name: "Nikhil",
    Place: "Mumbai",
    Animal: "Tiger",
    Thing: "Pen",
  },
};
$("#pay").click(function () {
  console.log("In Authorization");
  $.ajax({
    type: "POST",
    async: true,
    url: pageUrl + getAuthTokenUrl,
    data: JSON.stringify({
      access_key: "" + access_key + "",
      access_secret: "" + access_secret + "",
    }),
    cache: false,
    error: function (xhr, ajaxOptions, thrownError) {
      // alert(xhr.responseText);
    },
    xhr: function () {
      var xhr = new window.XMLHttpRequest();
      //Download progress
      xhr.addEventListener(
        "progress",
        function (evt) {
          //console.log(evt.lengthComputable);
          if (evt.lengthComputable) {
            // console.log("Downloading contents.");
          }
        },
        false
      );
      return xhr;
    },
    beforeSend: function () {
      // $('#img_bulk_anim_1').attr('src', 'img/bx_loader.gif');
    },
    complete: function () {
      // $('#img_bulk_anim_1').removeAttr('src');
    },
    success: function (data) {
      // alert(JSON.stringify(data));
      // $('#responseArrayPage').html(JSON.stringify(data) + ' Tokken: ' + u_token + ' userId: ' + uid);
      console.log(data, "GetAuthorizationToken");
      order_token = data.token;
      getOrderDetails(data.token);
    },
    failure: function () {
      // console.log('Ajax Failure.');
      console.log("Failed to get Token");
    },
  });
});

function getOrderDetails(token) {
  console.log(token, "token");
  const order_token = token;
  // headers: {
  //     Authorization: 'Bearer '+token
  // }
  $.ajax({
    type: "POST",
    async: true,
    url: pageUrl + GetOrderIdUrl,
    data: JSON.stringify(dataObj),
    headers: {
      Authorization: "Bearer " + order_token,
    },
    cache: false,
    error: function (xhr, ajaxOptions, thrownError) {
      // alert(xhr.responseText);
    },
    xhr: function () {
      var xhr = new window.XMLHttpRequest();
      //Download progress
      xhr.addEventListener(
        "progress",
        function (evt) {
          //console.log(evt.lengthComputable);
          if (evt.lengthComputable) {
            // console.log("Downloading contents.");
          }
        },
        false
      );
      return xhr;
    },
    beforeSend: function () {
      // $('#img_bulk_anim_1').attr('src', 'img/bx_loader.gif');
    },
    complete: function () {
      // $('#img_bulk_anim_1').removeAttr('src');
    },
    success: function (data) {
      console.log(data, "GetOrderId");
      console.log("UserId:", data.user_id);
      console.log("OrderId", data.order_id);
      fetchOrder(data.order_id, order_token, data.user.token);
    },
    failure: function () {
      // console.log('Ajax Failure.');
      console.log("Failed to get Token");
    },
  });
}
function fetchOrder(order_id, order_token, user_token) {
  console.log(order_token, "token");
  console.log(order_id, "order_id");
  console.log(user_token, "user_token");
  $.ajax({
    type: "POST",
    async: true,
    url: pageUrl + fetchOrderDetailsUrl,
    data: JSON.stringify({
      order_id: "" + order_id + "",
    }),
    headers: {
      Authorization: "Bearer " + order_token,
    },
    cache: false,
    error: function (xhr, ajaxOptions, thrownError) {
      // alert(xhr.responseText);
    },
    xhr: function () {
      var xhr = new window.XMLHttpRequest();
      //Download progress
      xhr.addEventListener(
        "progress",
        function (evt) {
          //console.log(evt.lengthComputable);
          if (evt.lengthComputable) {
            // console.log("Downloading contents.");
          }
        },
        false
      );
      return xhr;
    },
    beforeSend: function () {
      // $('#img_bulk_anim_1').attr('src', 'img/bx_loader.gif');
    },
    complete: function () {
      // $('#img_bulk_anim_1').removeAttr('src');
    },
    success: function (data) {
      // alert(JSON.stringify(data));
      // $('#responseArrayPage').html(JSON.stringify(data) + ' Tokken: ' + u_token + ' userId: ' + uid);
      // if(data.message === "Order Created Successfully"){
      //     console.log(data,"GetOrderId")
      // }
      // else{
      //     console.log("Failed to create Order");
      // }
      // console.log(data,"GetOrderId")
      // console.log("UserId:",data.user_id);
      // console.log("OrderId",data.order_id);
      // fetchOrder(data.order_id);
      console.log(data);
      populatePaymentMethods(data, order_id, order_token, user_token);
    },
    failure: function () {
      // console.log('Ajax Failure.');
      console.log("Failed to get Token");
    },
  });
}
function populatePaymentMethods(data, order_id, order_token, user_token) {
  console.log(data, "Payment Methods Available");
  console.log("Order_id", order_id);
  console.log("Order_token", order_token);
  console.log("user_token", user_token);
  for (let i = 0; i < data.length; i++) {
    $("#paymentMethods").append(
      '<div class="col3"><div>' +
        (i + 1) +
        "</div><div>" +
        data[i].payment_mode +
        '</div><div><button onclick=paynow("' +
        order_id +
        '","' +
        order_token +
        '","' +
        data[i].payment_mode +
        '","' +
        user_token +
        '")>Proceed</button></div></div>'
    );
  }
}

function paynow(order_id, order_token, payment_mode, user_token) {
  console.log("Order_id", order_id);
  console.log("Order_token", order_token);
  console.log("payment_mode", payment_mode);
  console.log("UserToken====>", user_token);
  $.ajax({
    type: "POST",
    async: true,
    url: pageUrl + initiatePaymentUrl,
    data: JSON.stringify({
      order_id: "" + order_id + "",
      payment_mode: "" + payment_mode + "",
    }),
    headers: 
      {
        'x-nimbbl-user-token': ''+user_token+'',
    'Authorization': 'Bearer '+order_token,
    'Content-Type': 'application/json'
      },
      
    

    cache: false,
    error: function (xhr, ajaxOptions, thrownError) {
      // alert(xhr.responseText);
    },
    xhr: function () {
      var xhr = new window.XMLHttpRequest();
      //Download progress
      xhr.addEventListener(
        "progress",
        function (evt) {
          //console.log(evt.lengthComputable);
          if (evt.lengthComputable) {
            // console.log("Downloading contents.");
          }
        },
        false
      );
      return xhr;
    },
    beforeSend: function () {
      // $('#img_bulk_anim_1').attr('src', 'img/bx_loader.gif');
    },
    complete: function () {
      // $('#img_bulk_anim_1').removeAttr('src');
    },
    success: function (data) {
      // alert(JSON.stringify(data));
      // $('#responseArrayPage').html(JSON.stringify(data) + ' Tokken: ' + u_token + ' userId: ' + uid);
      // if(data.message === "Order Created Successfully"){
      //     console.log(data,"GetOrderId")
      // }
      // else{
      //     console.log("Failed to create Order");
      // }
      // console.log(data,"GetOrderId")
      // console.log("UserId:",data.user_id);
      // console.log("OrderId",data.order_id);
      // fetchOrder(data.order_id);
      console.log(data, "AfterInitiatingPayment");
    },
    failure: function () {
      // console.log('Ajax Failure.');
      console.log("Failed to get Token");
    },
  });
}
