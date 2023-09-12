import {createClient, CreateClientParams} from "contentful";

export default class ContentfulClient {
	private contentfulClient = createClient(<CreateClientParams>{
		space: process.env.CONTENTFUL_SPACE,
		accessToken: process.env.CONTENTFUL_TOKEN
	});

	async getPage(title: string): Promise<object> {
		const options: object = {
			"content_type": "page",
			"fields.title": title
		};
		const entries = await this.contentfulClient.getEntries(options);
		return entries.items[0];
	}

	async getHomePageContentSection(): Promise<any> {
		const options: object = {
			"content_type": "homepageContentSection"
		};
		const entries = await this.contentfulClient.getEntries(options);
		return entries.items;
	}

	async getAboutPageBikeBrands(): Promise<any> {
		const options: object = {
			"content_type": "brands"
		};
		const entries = await this.contentfulClient.getEntries(options);
		return entries.items;
	}

	async getCompanyInfo(): Promise<any> {
		const options: object = {
			"content_type": "companyInformation"
		};
		const entries = await this.contentfulClient.getEntries(options);
		return entries.items[0];
	}

	async getFaqs(): Promise<any> {
		const options: object = {
			"content_type": "faq"
		};
		const entries = await this.contentfulClient.getEntries(options);
		return entries.items;
	}

}
