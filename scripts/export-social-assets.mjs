import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const exports = [
  {
      input: "07_outputs/facebook/caregiver-support-recharge-facebook.svg",
          outputBase: "dist/social/facebook/caregiver-support-recharge-facebook",
              width: 1080,
                  height: 1080
                    }
                    ];

                    const scales = [1, 2, 3];

                    async function fileExists(filePath) {
                      try {
                          await fs.access(filePath);
                              return true;
                                } catch {
                                    return false;
                                      }
                                      }

                                      async function exportSvg({ input, outputBase, width, height }) {
                                        if (!(await fileExists(input))) {
                                            throw new Error(`Missing input SVG: ${input}`);
                                              }

                                                const absoluteInput = path.resolve(input);
                                                  const browser = await chromium.launch();

                                                    try {
                                                        for (const scale of scales) {
                                                              const outputSize = width * scale;
                                                                    const outputPath = `${outputBase}-${outputSize}.png`;

                                                                          await fs.mkdir(path.dirname(outputPath), { recursive: true });

                                                                                const context = await browser.newContext({
                                                                                        viewport: { width, height },
                                                                                                deviceScaleFactor: scale
                                                                                                      });
                                                                                                      
                                                                                                            const page = await context.newPage();
                                                                                                            
                                                                                                                  const html = `<!doctype html>
                                                                                                                  <html>
                                                                                                                    <head>
                                                                                                                        <meta charset="utf-8" />
                                                                                                                            <style>
                                                                                                                                  html, body {
                                                                                                                                          margin: 0;
                                                                                                                                                  padding: 0;
                                                                                                                                                          width: ${width}px;
                                                                                                                                                                  height: ${height}px;
                                                                                                                                                                          overflow: hidden;
                                                                                                                                                                                  background: transparent;
                                                                                                                                                                                        }
                                                                                                                                                                                        
                                                                                                                                                                                              img {
                                                                                                                                                                                                      display: block;
                                                                                                                                                                                                              width: ${width}px;
                                                                                                                                                                                                                      height: ${height}px;
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                </style>
                                                                                                                                                                                                                                  </head>
                                                                                                                                                                                                                                    <body>
                                                                                                                                                                                                                                        <img src="file://${absoluteInput}" alt="" />
                                                                                                                                                                                                                                          </body>
                                                                                                                                                                                                                                          </html>`;
                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                await page.setContent(html, { waitUntil: "networkidle" });
                                                                                                                                                                                                                                                      await page.screenshot({
                                                                                                                                                                                                                                                              path: outputPath,
                                                                                                                                                                                                                                                                      clip: { x: 0, y: 0, width, height },
                                                                                                                                                                                                                                                                              type: "png"
                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                          await context.close();
                                                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                                                console.log(`Exported ${outputPath}`);
                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                      } finally {
                                                                                                                                                                                                                                                                                                          await browser.close();
                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                            for (const item of exports) {
                                                                                                                                                                                                                                                                                                              await exportSvg(item);
                                                                                                                                                                                                                                                                                                              }
