/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Settings = require('settings');
var ajax = require('ajax');

// Set a configurable with just the close callback
Settings.config(
  { url: 'https://hs2t.com/itemized/pebblejs-homeassistant-script-config/' },
  function (e) {
    console.log('closed configurable');

    // Show the parsed response
    console.log(JSON.stringify(e.options));

    // Show the raw response if parsing failed
    if (e.failed) {
      console.log(e.response);
    }
  }
);

var items = []
Settings.option('scripts').forEach(e => {
  items.push({
    title: e.name,
    script_id: e.id
  })
});

var main = new UI.Menu({
  sections: [{
    items
  }]
})

main.on('select', function (e) {

  console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
  console.log('The item is titled "' + e.item.title + '"');
  console.log('The item id "' + e.item.script_id + '"');

  ajax({
    url: `${Settings.option('url')}/api/services/script/${e.item.script_id}`,
    type: 'json',
    method: 'post',
    headers: { authorization: `Bearer ${Settings.option('token')}` }
  },
    function (data) {
      console.log(data);
    }, function (e) {
      console.log(e);
    }
  );
});

main.show();

// var main = new UI.Card({
//   title: 'Pebble.js',
//   icon: 'images/menu_icon.png',
//   subtitle: 'Hello World!',
//   body: 'Press any button.',
//   subtitleColor: 'indigo', // Named colors
//   bodyColor: '#9a0036' // Hex colors
// });

// main.show();

// main.on('click', 'up', function(e) {
//   var menu = new UI.Menu({
//     sections: [{
//       items: [{
//         title: 'Pebble.js',
//         icon: 'images/menu_icon.png',
//         subtitle: 'Can do Menus'
//       }, {
//         title: 'Second Item',
//         subtitle: 'Subtitle Text'
//       }, {
//         title: 'Third Item',
//       }, {
//         title: 'Fourth Item',
//       }]
//     }]
//   });
//   menu.on('select', function(e) {
//     console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
//     console.log('The item is titled "' + e.item.title + '"');
//   });
//   menu.show();
// });

// main.on('click', 'select', function(e) {
//   var wind = new UI.Window({
//     backgroundColor: 'black'
//   });
//   var radial = new UI.Radial({
//     size: new Vector2(140, 140),
//     angle: 0,
//     angle2: 300,
//     radius: 20,
//     backgroundColor: 'cyan',
//     borderColor: 'celeste',
//     borderWidth: 1,
//   });
//   var textfield = new UI.Text({
//     size: new Vector2(140, 60),
//     font: 'gothic-24-bold',
//     text: 'Dynamic\nWindow',
//     textAlign: 'center'
//   });
//   var windSize = wind.size();
//   // Center the radial in the window
//   var radialPos = radial.position()
//       .addSelf(windSize)
//       .subSelf(radial.size())
//       .multiplyScalar(0.5);
//   radial.position(radialPos);
//   // Center the textfield in the window
//   var textfieldPos = textfield.position()
//       .addSelf(windSize)
//       .subSelf(textfield.size())
//       .multiplyScalar(0.5);
//   textfield.position(textfieldPos);
//   wind.add(radial);
//   wind.add(textfield);
//   wind.show();
// });

// main.on('click', 'down', function(e) {
//   var card = new UI.Card();
//   card.title('A Card');
//   card.subtitle('Is a Window');
//   card.body('The simplest window type in Pebble.js.');
//   card.show();
// });
