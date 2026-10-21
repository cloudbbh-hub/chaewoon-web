import test from 'node:test';
import assert from 'node:assert/strict';
import {dailyCard,moods,treasures,collect,localDay} from '../js/data/play.js';
test('daily cards are complete, deterministic and validate mood',()=>{for(const mood of moods){const card=dailyCard(mood.id,'2026-10-21');assert.ok(card.message&&card.title&&card.mission);assert.deepEqual(card,dailyCard(mood.id,'2026-10-21'));}assert.throws(()=>dailyCard('missing'));assert.equal(localDay(new Date(2026,9,21)),'2026-10-21');});
test('treasures count unique valid finds without mutating progress',()=>{const initial=[];let found=collect(initial,treasures[0].id);assert.deepEqual(initial,[]);found=collect(found,treasures[0].id);assert.equal(found.length,1);assert.deepEqual(collect(found,'invalid'),found);for(const t of treasures)found=collect(found,t.id);assert.equal(found.length,6);});
