/** @format */

export interface home_schema {
	placesOutput: {
		node: {
			category: string;
			createdAt: string;
			description: string;
			id: string;
			photo: {
				url: string;
			};
			placeName: string;
		}[];
	}[];
	categoriesOutput: [];
	mostCommentedOutput: {
		node: {
			createdAt: string;
			id: string;
			photo: {
				url: string;
			};
			placeName: string;
		}[];
		count: number;
	};
}

export interface mostCommentedOutput_schema {
	node: {
		createdAt: string;
		id: string;
		photo: {
			url: string;
		};
		placeName: string;
	}[];
	count: number;
}

export interface placeResponse_schema {
	placesSConnection: {
		edges: {
			node: {
				category: string;
				createdAt: string;
				description: string;
				id: string;
				photo: {
					url: string;
				};
				placeName: string;
			}[];
		}[];
	};
}

export interface placesOutput_schema {
	node: {
		category: string;
		createdAt: string;
		description: string;
		id: string;
		photo: {
			url: string;
		};
		placeName: string;
	}[];
}

export interface categoryResponse_schema {
	placesSConnection: {
		edges: {
			node: {
				category: string;
				commentS: { id: string }[];
				id: string;
			};
		}[];
	};
}

export interface categoryNodes_schema {
	node: {
		category: string;
		commentS: { id: string }[];
		id: string;
	};
}

export interface mostCommenteArr_schema {
	place: string;
	count: number;
}

export interface mostCommentedVaules_schema {
	node: {
		createdAt: string;
		id: string;
		photo: {
			url: string;
		};
		placeName: string;
	};
}

export interface mostCommentedResponse_schema {
	placesSConnection: {
		edges: {
			node: {
				createdAt: string;
				id: string;
				photo: {
					url: string;
				};
				placeName: string;
			};
		}[];
	};
}

export interface context_schema {
	data: {
		node: {
			category: string;
			createdAt: string;
			description: string;
			id: string;
			photo: {
				url: string;
			};
			placeName: string;
		}[];
	}[];
	mostCommentedOutput: mostCommentedOutput_schema;
	categoriesOutput: [];
	setNumberToLoad: React.Dispatch<React.SetStateAction<number>>;
	type: string;
	maxWidth900: boolean;
	maxWidth600: boolean;
}
