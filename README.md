# Goldshish

[Goldshish](https://goldshish.it) is a website dedicated to collecting and sharing student notes for several physics-related courses @ Università degli Studi di Padova.

It was born as the successor of [Goldshish v2](https://einlar.github.io), with the addition of interactivity. In particular, any who creates a (free) account can:
- Upload `.pdf` notes and organize them by *course*, *professor* and *year*
- Add highlights and comments to existing `.pdf` notes for feedback, either to make suggestions or correct mistakes.

Goldshish is built entirely on [Vulcan.js](http://vulcanjs.org/), an open-source full-stack Javascript framework based on React and GraphQL.

 Moreover, [Ckeditor](https://ckeditor.com/) is used for constructing the interactive text editors in the interface, which are also compatible with [Katex](https://katex.org/) for rendering math.

## Running Goldshish on a local machine
Goldshish is completely open source, and you can run your own copy on your local machine by following these steps. 

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



