import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { EstablishmentsService } from 'src/app/pages/establishments/services/establishments.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private establishmentService:EstablishmentsService) { }

  fileUpload(file, timestamp) {
    const contentType = file.type;
    const bucket = new S3(
    {
    accessKeyId: 'AKIASXSKUS5OM37CT76O',
    secretAccessKey: '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',
    region: 'us-east-2',
    }
    );
    const params = {
    Bucket: 'hamgus-1',
    Key: file.name + timestamp,
    Body: file,
    ACL: 'public-read',
    ContentType: contentType
    };
    bucket.upload(params, function (err, data) {
    if (err) {
    console.log('EROOR: ',JSON.stringify( err));
    return false;
    }
    console.log('File Uploaded.', data);
    return true;
    });
    }
}
