var lineLegend = [{"type":" ","name":"Unknown","group":"Unknown","class":"unknown","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/unknown-line.svg","maxZoom":21,"minZoom":14,"css":"line-color: #b2b2b2; line-opacity: 1; line-width:1","frequency":5},
{"type":"ARR","name":"Abandoned Railroad","group":"Abandoned Railroad","class":"railroad","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/abandoned-rr.svg","maxZoom":21,"minZoom":13,"css":"::line, ::hatch { line-color: #9d9d9d; } ::line { [zoom > 14]{ line-width:4;}[zoom > 12]{ line-width:2;}[zoom > 10]{ line-width:1;}[zoom < 10]{line-width: 0.75;}} ::hatch {[zoom>13]{line-width: 6;} line-width: 4; line-dasharray: 1, 24;}","frequency":695},
{"type":"BL","name":"?","group":"Unknown","class":"unknown","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/unknown-line.svg","maxZoom":21,"minZoom":14,"css":"line-color: #b2b2b2; line-opacity: 1; line-width:1","frequency":62},
{"type":"BS","name":"?","group":"Unknown","class":"unknown","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/unknown-line.svg","maxZoom":21,"minZoom":14,"css":"line-color: #b2b2b2; line-opacity: 1; line-width:1","frequency":169},
{"type":"CB","name":"Civil Town Boundary","group":"Civil Town Boundary","class":"other","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/town-boundary.svg","maxZoom":21,"minZoom":12,"css":"line-color: #e4dd51; line-width: 3; line-opacity: .75;","frequency":369},
{"type":"CL","name":"Cliff","group":"Cliff","class":"other","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/cliff.svg","maxZoom":21,"minZoom":13,"css":"line-color: #7d9027; [zoom<10]{line-width:12;}[zoom<13]{line-width: 4;}[zoom>12]{line-width: 2;}[zoom>14]{line-width: 1;} line-opacity: 1; line-dasharray: 0.9;","frequency":255},
{"type":"Cliff","name":"Cliff","group":"Cliff","class":"other","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/cliff.svg","maxZoom":21,"minZoom":13,"css":"line-color: #7d9027; [zoom<10]{line-width:12;}[zoom<13]{line-width: 4;}[zoom>12]{line-width: 2;}[zoom>14]{line-width: 1;} line-opacity: 1; line-dasharray: 0.9;","frequency":43},
{"type":"DD","name":"Drainage Ditch","group":"Drainage Ditch","class":"other","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/drainage-ditch.svg","maxZoom":21,"minZoom":14,"css":"line-color: #3a708a; line-width: 1; line-opacity: 1; line-dasharray: 15, 10, 5, 10, 15;","frequency":960},
{"type":"DFL","name":"Drivable Fire Lane","group":"Drivable Fire Lane","class":"trail","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/drive-fire.svg","maxZoom":21,"minZoom":13,"css":"line-color: #8a2121; line-width: 1; line-opacity: 1;","frequency":151},
{"type":"FL","name":"Non-drivable Fire Lane","group":"Non-drivable Fire Lane","class":"trail","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/no-drive-fire.svg","maxZoom":21,"minZoom":13,"css":"line-color: #aa2521; line-width: 1; line-opacity: 1; line-dasharray: 10, 5;","frequency":34},
{"type":"HR","name":"Hard Surfaced Road","group":"Hard Surfaced Road","class":"road","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/hard-road.svg","maxZoom":21,"minZoom":9,"css":"line-color: #404040; line-opacity: 1; [zoom < 10]{line-width: 0.75;}[zoom >=10]{line-width: 2;}[zoom >=12]{line-width: 4;}[zoom >=16]{line-width: 6;}","frequency":1029},
{"type":"I","name":"Intermittent Stream","group":"Intermittent Stream","class":"stream","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/inter-stream.svg","maxZoom":21,"minZoom":13,"css":"line-color: #85c5d3; line-width: 1; line-opacity: 1;","frequency":1866},
{"type":"ID","name":"Improved Dirt Road","group":"Improved Dirt Road","class":"road","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/improved-dirt.svg","maxZoom":21,"minZoom":10,"css":"::case {[zoom <12]{line-width: 2;}[zoom >=12]{line-width: 4;} line-color:#000000;} ::fill {[zoom <12]{line-width: 1;}[zoom >=12]{line-width: 2;} line-color:#513c2d;}","frequency":7858},
{"type":"IG","name":"Improved Gravel Road","group":"Improved Gravel Road","class":"road","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/improved-gravel.svg","maxZoom":21,"minZoom":10,"css":"::case {[zoom <12]{line-width: 2;}[zoom >=12]{line-width: 4;} line-color:#000000;} ::fill {[zoom <12]{line-width: 1;}[zoom >=12]{line-width: 2;} line-color:#bfa18b;}","frequency":3529},
{"type":"PL","name":"Power Line","group":"Power Line","class":"infrastructure","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/powerline.svg","maxZoom":21,"minZoom":14,"css":"line-color: #9f6bad; line-width: .75; line-opacity: 1;","frequency":4228},
{"type":"R","name":"Stream","group":"Stream","class":"stream","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/stream.svg","maxZoom":21,"minZoom":7,"css":"line-color: #4daabf; [zoom <8]{line-width: .15;}[zoom <9]{line-width: .35;} [zoom <11]{line-width: 1;} [zoom>=10]{line-width: 1.5} line-opacity: 1;","frequency":9256},
{"type":"RR","name":"Railroad","group":"Railroad","class":"railroad","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/rr.svg","maxZoom":21,"minZoom":10,"css":"::line, ::hatch { line-color: #363636; } ::line {[zoom > 14]{ line-width:4;}[zoom > 12]{ line-width:2;}[zoom > 10]{ line-width:1;}[zoom < 10]{line-width: 0.75;} } ::hatch {[zoom>13]{line-width: 6;} line-width: 4; line-dasharray: 1, 24;}","frequency":693},
{"type":"TL","name":"Telephone Line","group":"Telephone Line","class":"infrastructure","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/telephone.svg","maxZoom":12,"minZoom":14,"css":"line-color: #ffc266; line-width: 0.75; line-opacity: 1;","frequency":4972},
{"type":"TR","name":"Trail","group":"Trail","class":"trail","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/trail.svg","maxZoom":21,"minZoom":13,"css":"line-color: #836c4b; line-width: 1; line-opacity: 1; line-dasharray: 5,10;","frequency":2197},
{"type":"U","name":"Unknown","group":"Unknown","class":"unknown","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/unknown-line.svg","maxZoom":21,"minZoom":14,"css":"line-color: #b2b2b2; line-opacity: 1; line-width:1","frequency":29},
{"type":"UD","name":"Unimproved Dirt Road","group":"Unimproved Dirt Road","class":"road","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/unimproved-dirt.svg","maxZoom":21,"minZoom":11,"css":"line-color:#513c2d; line-opacity: 1; line-width: 2; ","frequency":6130},
{"type":"UG","name":"Unimproved Gravel Road","group":"Unimproved Gravel Road","class":"road","icon":"https://maps.sco.wisc.edu/BordnerCoastal/BordnerIcon/unimproved-gravel.svg","maxZoom":21,"minZoom":11,"css":"line-color:#bfa18b; line-opacity: 1; line-width: 2;","frequency":2750}]
