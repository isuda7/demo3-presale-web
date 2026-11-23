# 사용: python3 scripts/mark-site.py <slug> key=value ... (sites.json 갱신용 보조 스크립트)
import json, sys
slug, *pairs = sys.argv[1:]
d = json.load(open('sites.json'))
s = next(x for x in d['sites'] if x['slug'] == slug)
for p in pairs:
    k, v = p.split('=', 1)
    if k.startswith('theme.'):
        s.setdefault('theme', {})[k[6:]] = v
    else:
        s[k] = int(v) if v.isdigit() else v
json.dump(d, open('sites.json', 'w'), ensure_ascii=False, indent=2)
print(s)
