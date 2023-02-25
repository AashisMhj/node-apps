const directoryPath = require('../config');
const fs = require('fs');
const path = require('path');

const commonVideoExtensions = [
    '.webm', '.avi', '.mp4', '.mkv'
]

// get all the list of files from given dir| dir+req.auery.path
const getVideosofDir = (req, res,)=>{
    let newDirectoryPath = "";
    // get parent path if exists
    if(req.query.path){
        newDirectoryPath = req.query.path;
    }

    fs.readdir(directoryPath+newDirectoryPath, function (err, files) {
        //handling error if the path/folder does not exist
        if (err) {
            return res.render('error');
        }

        let dir = [];
        let videoFiles = [];
        // filter folders 
        files.forEach(file => {
            // check fit file is folder 
            let stats = fs.statSync(directoryPath+newDirectoryPath+file);
            if(stats.isDirectory()){
                dir.push(file);
            }else if(!dir.includes(file)){
                // get extension of file
                const fileExt = path.extname(file);
                // check if extension is of video
                commonVideoExtensions.includes(fileExt) && (
                    videoFiles.push(file)
                )
            }
        });
        return res.render('index',{
            files: videoFiles,
            dir,
            path: newDirectoryPath
        }); 
    }); 
}

/*
call back function which check if the given path is a file or folder
if it is file it will display the video html
if not it will redirect to the / with the path
*/
const getVideos = (req, res)=>{
    const fileName = req.query.file;
    const path = req.query.path;

    res.render('video', {name: fileName, path});
}
const getVideo = (req, res)=>{
    let name = req.params.name;
    let path = req.query.path;
    const videoPath = directoryPath+path+name;
    fs.stat(videoPath, (err, stat)=>{
        if(err !== null && err.code === 'ENOENT'){
            res.send('File not found');
        }
        const fileSize = stat.size;
        const range = req.headers.range;
        if(range){
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;

            const chunkSize = (end-start)+1;
            const file = fs.createReadStream(videoPath, {start, end});
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges':'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4'
            };

            res.writeHead(206, head);
            file.pipe(res);
        }else{
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    });
}
const downloadVideo = (req, res)=>{
    let name = req.params.name;
    let path = req.query.path;
    const videoPath = directoryPath+path+name;
    res.download(videoPath, (err)=>{
        if(err){
            return res.status(500).json({status: 'Error', msg: 'Server Error'})
        }
    })
}


module.exports = {
    getVideo,
    getVideosofDir,
    getVideos,
    downloadVideo
}