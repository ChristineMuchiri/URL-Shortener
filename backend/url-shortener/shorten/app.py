import json, os, string, random
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])

# generate short random code
def generate_code(length=6):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        original_url = body['url']
    
    #generate a short code
        short_code = generate_code()
    
    #store in dynamodb
        table.put_item(Item={'short_code': short_code, 'original_url': original_url})
    
    #return short URl
        return {
        "statusCode": 200,
        "body": json.dumps({"short_url": f"cuttly.space/{short_code}"})
    }
    # parse incoming request body
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            "body": json.dumps({"error": str(e)})
        }
    