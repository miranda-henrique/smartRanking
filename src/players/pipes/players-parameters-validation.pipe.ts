import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

class playersParametersValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!value) {
            throw new BadRequestException(`${metadata.data} parameter must be informed`);
        }

        return value;
    }
}

export { playersParametersValidationPipe };