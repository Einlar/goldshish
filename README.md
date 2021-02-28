# Goldshish

[Goldshish](https://goldshish.it) is a website dedicated to collecting and sharing student notes for several physics-related courses @ Università degli Studi di Padova.

It was born as the successor of [Goldshish v2](https://einlar.github.io), with the addition of interactivity. In particular, any who creates a (free) account can:
- Upload `.pdf` notes and organize them by *course*, *professor* and *year*
- Add highlights and comments to existing `.pdf` notes for feedback, either to make suggestions or correct mistakes.

Goldshish is built entirely on [Vulcan.js](http://vulcanjs.org/), an open-source full-stack Javascript framework based on React and GraphQL.

 Moreover, [Ckeditor](https://ckeditor.com/) is used for constructing the interactive text editors in the interface, which are also compatible with [Katex](https://katex.org/) for rendering math.

## Running Goldshish on a local machine
Goldshish is completely open source, and you can run your own copy on your local machine by following these steps. This can be useful for developing new features, or just to prepare for the apocalypse, if the Internet goes down but you still need the notes to earn precious CFUs.

### Prerequisites
This guide is for Ubuntu 20.04. Previous versions of Ubuntu, or other Linux distributions (e.g. Debian/arch) could work too, but they may require some adjustments. No instructions are provided for MacOS/Windows, but this procedure should work on the Windows Linux Subsystem with minor modifications (however, it will likely run *very* slow).

Note that only x86/amd64 architectures are supported. In particular, there is no build of Meteor (a required library for Vulcan) on arm, and so it is not possible (yet) to run Goldshish on a Raspberry Pi.

As a start, follow the first steps of the [Vulcan Starter guide](https://github.com/VulcanJS/Vulcan-Starter#complete-install). Namely, run these commands:

    sudo apt install -y git curl build-essential; #Prerequisites
    curl https://install.meteor.com/ | sh; #Download + Install Meteor

    echo -e "\nMeteor version..."; #Check installation
    meteor --version;
    export METEOR_NODE_VERSION=$(meteor node --version);
    echo -e "Meteor Node version...\n ${METEOR_NODE_VERSION}";

    # Install 'nvm', so as to be able to easily switch NodeJs versions
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash;

    # Prepare to use 'nvm' immediately
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion


    # Set Meteor version of Node as your default for NodeJS work outside of Meteor
    nvm install ${METEOR_NODE_VERSION};
    nvm alias default ${METEOR_NODE_VERSION};

### Goldshish installation
The default configuration of Goldshish requires a folder under `/home/ubuntu/projects/uploads` to store the uploaded notes. This is hard-coded, because the remote setup is done inside a Docker image. 
If your Ubuntu username is already `ubuntu`, you can just create this folder. Otherwise, you will need admin privileges:

    sudo mkdir -p /home/ubuntu/projects/uploads
    #Give writing permission to yourself. Substitute "<username>" with your Ubuntu username
    sudo chown -R <username>:<username> /home/ubuntu/ 

Now you are ready to clone this report and run it:

    git clone https://github.com/Einlar/goldshish
    cd goldshish
    meteor npm install #Install required node.js packages
    meteor npm start #Run the website locally

If everything went correctly, you will see the (empty) website at `http://localhost:3000`.

### Loading the notes

All content on Goldshish is stored periodically in local backups by an automated script. Every once in a while, "checkpoints" of the website's state will be published in this Github [Releases](https://github.com/Einlar/goldshish/releases). 

You can use them to populate your local copy of Goldshish with all the data from the live [website](https://goldshish.it). Note that doing so will *erase* any data you have in your copy. So, if you have uploaded some more notes on your local Goldshish for some reason, be reminded that they will be removed from the database!

To proceed, you will need to install this package:

    sudo apt-get install mongo-tools

which is needed to restore Goldshish database (which uses MongoDB). 

Then, download one of the releases. You will get two files: `uploads.zip` and `mongodump.zip`.

1. Unpack all the pdf files from `uploads.zip` in the folder `/home/ubuntu/projects/uploads`. 

    That is, if you run `ls /home/ubuntu/projects/uploads`, you should see a bunch of `.pdf` files with weird names such as `2WRRC2EBx4xPcHZN7.pdf`. 
2. Unpack `mongodump.zip` in a folder named `mongodump`. If you type `ls mongodump`, it should show a single folder named `Goldshish`. 

    Now spin up your Goldshish copy (run `meteor npm start` from the repository folder), and wait until it finishes loading.

    From the folder that contains the `mongodump` folder, run the following command:

        mongorestore -h 127.0.0.1 --port 3001 -d meteor mongodump/Goldshish --drop

    This will replace your local database with the one from the "checkpoint". In this way, your local copy of Goldshish will perfectly mirror the one from the backup.

Note that, for security reasons, all private user data (e.g. passwords) has been *purged* from the database you can download from the releases. Passwords are stored encrypted in the database, so this is probably overkill, but it's always better to err on the safe side.

As a consequence, if you have already an account on the real Goldshish, you won't be able to login with it on your local copy: the missing records will make the login attempt fail with an "Unknown error". This is intended.

You can always create a new user locally and give yourself admin privileges by manually editing the database fields (I suggest using [MongoDB Compass](https://www.mongodb.com/products/compass) to do so, the database is at `mongodb://127.0.0.1:3001`). The possibilities are endless!


## License
The whole Goldshish repository is sublicensed under the Creatice Commons Attribution NonCommercial ShareAlike (CC-NC-SA) license [[tldr](https://tldrlegal.com/license/creative-commons-attribution-noncommercial-sharealike-(cc-nc-sa)#summary)]. In fact, Vulcan.js (which is used to create Goldshish) is distributed under the MIT license, which allows sublicensing.
