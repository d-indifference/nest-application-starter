import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

/**
 * DTO for delete entity operation
 */
export class DeleteDto {
	/**
	 * Entity IDs to delete
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
