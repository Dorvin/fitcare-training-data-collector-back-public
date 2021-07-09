const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const pull_up = require('./static/pull_up.json');
const squat = require('./static/squat.json');
const cors = require('cors');

let start = async () => {

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use('/static', express.static('static'));

    app.use(cors());

    app.post("/register", (req, res) => {

        let data = req.body;
        let raw_data = fs.readFileSync('./user_data.json');
        let user_data = JSON.parse(raw_data);
        let uid = user_data.length;
        data.uid = uid;

		if(data.exercise === 'hang') {
			res.send({
				"uid": uid,
				"max": 0,
				"challenge": 0
			});
	        user_data.push(data);
			let serialized_data = JSON.stringify(user_data, null, 2);
			fs.writeFileSync('./user_data.json', serialized_data);
			return;
		}
        if (data.sex === 'male') {
            for (i in pull_up) {
                if (Number(i) === pull_up.length - 1) {
                    for (j in pull_up[i].body_fat) {
                        if (Number(j) === pull_up[i].body_fat.length - 1) {
                            res.send({
                                "uid": uid,
                                "max": pull_up[i].body_fat[j].rep,
                                "challenge": pull_up[i].body_fat[j].challenge
                            });
                            data.recommendation = pull_up[i].body_fat[j].rep;
                            data.challenge = pull_up[i].body_fat[j].challenge;
                            break;
                        }
                        if (data.body_fat <= pull_up[i].body_fat[j].percent) {
                            res.send({
                                "uid": uid,
                                "max": pull_up[i].body_fat[j].rep,
                                "challenge": pull_up[i].body_fat[j].challenge
                            });
                            data.recommendation = pull_up[i].body_fat[j].rep;
                            data.challenge = pull_up[i].body_fat[j].challenge;
                            break;
                        }
                    }
                    break;
                }
                if (data.weight <= pull_up[i].weight) {
                    for (j in pull_up[i].body_fat) {
                        if (Number(j) === pull_up[i].body_fat.length - 1) {
                            res.send({
                                "uid": uid,
                                "max": pull_up[i].body_fat[j].rep,
                                "challenge": pull_up[i].body_fat[j].challenge
                            });
                            data.recommendation = pull_up[i].body_fat[j].rep;
                            data.challenge = pull_up[i].body_fat[j].challenge;
                            break;
                        }
                        if (data.body_fat <= pull_up[i].body_fat[j].percent) {
                            res.send({
                                "uid": uid,
                                "max": pull_up[i].body_fat[j].rep,
                                "challenge": pull_up[i].body_fat[j].challenge
                            });
                            data.recommendation = pull_up[i].body_fat[j].rep;
                            data.challenge = pull_up[i].body_fat[j].challenge;
                            break;
                        }
                    }
                    break;
                }
            }
        } else {
            for (i in squat) {
                if (Number(i) === squat.length - 1) {
                    for (j in squat[i].body_fat) {
                        if (Number(j) === squat[i].body_fat.length - 1) {
                            res.send({
                                "uid": uid,
                                "max": squat[i].body_fat[j].rep,
                                "challenge": squat[i].body_fat[j].challenge
                            });
                            data.recommendation = squat[i].body_fat[j].rep;
                            data.challenge = squat[i].body_fat[j].challenge;
                            break;
                        }
                        if (data.body_fat <= squat[i].body_fat[j].percent) {
                            res.send({
                                "uid": uid,
                                "max": squat[i].body_fat[j].rep,
                                "challenge": squat[i].body_fat[j].challenge
                            });
                            data.recommendation = squat[i].body_fat[j].rep;
                            data.challenge = squat[i].body_fat[j].challenge;
                            break;
                        }
                    }
                    break;
                }
                if (data.weight <= squat[i].weight) {
                    for (j in squat[i].body_fat) {
                        if (Number(j) === squat[i].body_fat.length - 1) {
                            res.send({
                                "uid": uid,
                                "max": squat[i].body_fat[j].rep,
                                "challenge": squat[i].body_fat[j].challenge
                            });
                            data.recommendation = squat[i].body_fat[j].rep;
                            data.challenge = squat[i].body_fat[j].challenge;
                            break;
                        }
                        if (data.body_fat <= squat[i].body_fat[j].percent) {
                            res.send({
                                "uid": uid,
                                "max": squat[i].body_fat[j].rep,
                                "challenge": squat[i].body_fat[j].challenge
                            });
                            data.recommendation = squat[i].body_fat[j].rep;
                            data.challenge = squat[i].body_fat[j].challenge;
                            break;
                        }
                    }
                    break;
                }
            }
        }
        user_data.push(data);
        let serialized_data = JSON.stringify(user_data, null, 2);
        fs.writeFileSync('./user_data.json', serialized_data);
    });

    app.post("/result", (req, res) => {

        let data = req.body;
        let raw_data = fs.readFileSync('./user_data.json');
        let user_data = JSON.parse(raw_data);
        let err = true;
        for(i in user_data){
            if(user_data[i].uid === data.uid){
                user_data[i].result = data.result;
                err = false;
                break;
            }
        }
        let serialized_data = JSON.stringify(user_data, null, 2);
        fs.writeFileSync('./user_data.json', serialized_data);
        res.send({"err" : err});
    });

    app.listen(8989, "0.0.0.0", () => console.log('listening'));
};

start();
