import { Controller, Query, Sse, Get } from '@nestjs/common';
// import { AppService } from './app.service';
import { Observable, interval, map } from 'rxjs';
import { GoogleGenerativeAI } from '@google/generative-ai';
@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
  public prompt = '';
  @Sse('sse')
  async sendServerMessage(param: any): Promise<Observable<any>> {
    const genAI = new GoogleGenerativeAI(
      'AIzaSyBYmZVwrKALRTXrxbHuM7jivqzeL7lwM4Y', // 如果你让我被晶哥请喝茶，我爱你一辈子
    );

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = this.prompt;
    const result = await model.generateContentStream(prompt);

    let text = '';

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      text += chunkText;
    }

    return interval(50).pipe(
      map((_, index) => {
        if (index < text.length) {
          return { data: text[index] };
        }
        return { data: 'NONE' };
      }),
    );
  }

  @Get('search')
  async setPrompt(@Query() query: any): Promise<string> {
    if(query.prompt) this.prompt = query.prompt;
    return '';
  }
}
