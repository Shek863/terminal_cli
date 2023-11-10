#! /usr/bin/env node
const chalk = require('chalk')
const boxen = require('boxen')
const yargs = require("yargs");
const figlet = require('figlet');
const { exec } = require("child_process");

const usage = chalk.keyword('violet')("\nUsage: terminal -i <initialize> \n"
+ boxen(chalk.green("\n" + "Configure KKiaPay Pos Terminal" + "\n"), {padding: 1, borderColor: 'blue', dimBorder: true}) + "\n");
const options = yargs
      .usage(usage)
      .option("i", {alias:"initialize", describe: "Initialize environment", type: "string", demandOption: false })
      .option("c", {alias:"configure", describe: "Configure Terminal", type: "string", demandOption: false })
      .option("b", {alias:"build", describe: "build for production", type: "string", demandOption: false })
      .help(true)
      .argv;

const argv = require('yargs/yargs')(process.argv.slice(2)).argv;


if(argv.configure == null && argv.c == null 
    && argv.initialize == null && argv.i == null 
    && argv.build == null && argv.b == null ){
    console.log(
        chalk.yellow(
          figlet.textSync('TerminalCLI', { horizontalLayout: 'full' })
        )
      );
    yargs.showHelp();
    return;
}



if(argv.initialize != null || argv.i != null){
   
    ////////
    //////////////
    ///********* Check if adb is avalaible */
    ///**************** */
    console.log(`check adb`);
    exec("adb --help", (error, stdout, stderr) => {
        if (error) {
            console.log(`adb not found`);
            console.error(error);
            return;
        }
        console.log(`adb is available`);

        ////////
        //////////////
        ///********* Download apks */
        ///**************** */
        console.log(`start apps download`);
        exec(`curl -o launcher.apk 'https://firebasestorage.googleapis.com/v0/b/kkiapay-ee33f.appspot.com/o/pos-cli-file%2Ftpe-launcher.apk?alt=media&token=38cbc62b-3217-4b83-a720-858a60d2b55d&_gl=1*y4xcin*_ga*NTM3ODU0OTEuMTY5ODI2NzYyMQ..*_ga_CW55HF8NVT*MTY5OTQ0MDk5OC4yNS4xLjE2OTk0NDExMzEuNjAuMC4w'`, (error, stdout, stderr) => {
            if (error) {
                console.error(error);
                return;
            }
            if (stderr) {
                console.log(`${stderr}`);
            }
            console.log(`${stdout}`);
            console.log(`launcher.apk download finish`);  

            exec(`curl -o kkiapay_pos.apk 'https://firebasestorage.googleapis.com/v0/b/kkiapay-ee33f.appspot.com/o/pos-cli-file%2Fpos-mobile.apk?alt=media&token=e87c25d4-867a-4249-a179-f42a4969e6bd&_gl=1*5ovtj9*_ga*NTM3ODU0OTEuMTY5ODI2NzYyMQ..*_ga_CW55HF8NVT*MTY5OTQ0MDk5OC4yNS4xLjE2OTk0NDExNTcuMzQuMC4w';`, (error, stdout, stderr) => {
                if (error) {
                    console.error(error);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                }
                console.log(`${stdout}`);
                console.log(`kkiapay_pos.apk download finish`); 

                console.log(`env. initialize successfuly`);        
             });
                
        });
        
    });
}

if(argv.configure != null || argv.c != null){
   
    ////////
    //////////////
    ///********* Remove unused packages */
    ///**************** */
    console.log(`Remove unuse packages`);
    exec(`adb shell pm disable-user --user 0 com.google.android.youtube; 
    adb shell pm disable-user --user 0 com.google.android.videos; 
    adb shell pm disable-user --user 0 com.google.android.apps.googleassistant; 
    adb shell pm disable-user --user 0 com.android.vending; 
    adb shell pm disable-user --user 0 com.google.android.deskclock; 
    adb shell pm disable-user --user 0 com.google.android.gm; 
    adb shell pm disable-user --user 0 com.google.android.apps.tachyon; 
    adb shell pm disable-user --user 0 com.google.android.apps.nbu.files; 
    adb shell pm disable-user --user 0 com.google.android.apps.docs; 
    adb shell pm disable-user --user 0 com.google.android.apps.maps; 
    adb shell pm disable-user --user 0 com.google.android.contacts; 
    adb shell pm disable-user --user 0 com.google.android.calculator; 
    adb shell pm disable-user --user 0 com.android.chrome; 
    adb shell pm disable-user --user 0 com.google.android.apps.photos; 
    adb shell pm disable-user --user 0 com.google.android.calendar; 
    adb shell pm disable-user --user 0 com.google.android.apps.youtube.music; 
    adb shell pm disable-user --user 0 com.google.android.keep;`, (error, stdout, stderr) => {
        if (error) {
            //console.error(error);
            //return;
        }
        if (stderr) {
            //console.log(`stderr: ${stderr}`);
            //return;
        }
        console.log(`packages was removed successfuly`);
        //console.log(`##--------------------------------------------------------`);

    });

}

if(argv.build != null || argv.b != null){

    const pricing =  argv.b || argv.build;

            if(pricing != "tpe" && pricing != "free")
            {
                console.log(`cmd not found`);
                return
            }

            if(pricing == "tpe")
            {
                console.log(`commig soon`);
                return
            }

            //////////////
            ///********* Install apks */
            ///**************** */
            console.log(`start installation`);
            exec("adb install -r --user 0 launcher.apk; adb install -r --user 0 kkiapay_pos.apk", (error, stdout, stderr) => {
                
                if (error) {
                    console.error(error);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                }
                console.log(`Install : success`);

                //////////////
                ///*********  set-home-activity */
                ///**************** */
                console.log(`set tpe_launcher as home activity`);
                exec("adb shell cmd package set-home-activity co.opensi.tpe_launcher/co.opensi.tpe_launcher.MainActivity", (error, stdout, stderr) => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                    }
                    console.log(`home-activity set successfuly`);
                });

            });

}


///