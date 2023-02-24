import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

/**
 * DTO для операции удаления сущнностей
 */
export class DeleteDto {
	/**
	 * ID сущностей для их удаления
	 */
	@ApiProperty({
		description: 'Entities IDs for delete',
		example: [1, 2, 3],
		type: Number,
		isArray: true
	})
	@IsNumber({}, { each: true, message: 'Should be number' })
	ids: number[];
}
