import { HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';

export const randomString = (length) => {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

export const exeFileFilter = (req, file, callback) => {
    //   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    //     return callback(new Error('Only image files are allowed!'), false);
    //   }
    if (file.originalname.match(/\.(exe)$/)) {
        return callback(
            new HttpException(
                {
                    status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
                    message: '.exe file is prohibited',
                },
                HttpStatus.UNSUPPORTED_MEDIA_TYPE,
            ),
            false,
        );
    }
    callback(null, true);
};

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};