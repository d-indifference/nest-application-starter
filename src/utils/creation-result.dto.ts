import { ApiProperty } from '@nestjs/swagger';

/**
 * Entity creation result DTO
 */
export class CreationResultDto {
	/**
	 * Entity creation result DTO
	 * @param id Entity ID
	 */
	constructor(id: number) {
		this.id = id;
	}

	/**
	 * Entity ID
	 */
	@ApiProperty({ description: 'Enitiy ID', example: 123 })
	id: number;
}
